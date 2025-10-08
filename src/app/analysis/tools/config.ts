import mysql from "mysql2/promise";
import { Client, ClientConfig } from "pg";
import sql, { config as mssqlConfig } from "mssql";
import { MongoClient, MongoClientOptions } from "mongodb";
import { Service } from "typedi";

// Types
export type DatabaseType = "mysql" | "postgresql" | "mssql" | "mongodb";

export type ConnectionConfig = {
  mysql: mysql.ConnectionOptions;
  postgresql: ClientConfig;
  mssql: mssqlConfig;
  mongodb: {
    uri: string;
    options?: MongoClientOptions;
    dbName?: string;
  };
};

type Connection = {
  mysql: mysql.Connection;
  postgresql: Client;
  mssql: sql.ConnectionPool;
  mongodb: MongoClient;
};

type QueryParams = any[] | Record<string, any>;

type MongoQuery = {
  op: "find" | "insert" | "update" | "delete";
  filter?: Record<string, any>;
  update?: Record<string, any>;
  options?: Record<string, any>;
  documents?: Record<string, any>[];
};

// Custom Errors
class DatabaseError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = this.constructor.name;
    if (options?.cause) {
      (this as any).cause = options.cause;
    }
  }
}

class ConnectionError extends DatabaseError {}
class QueryError extends DatabaseError {}
class InvalidConnectionError extends DatabaseError {}

@Service()
export class DatabaseManager {
  private connections: Map<
    string,
    {
      type: DatabaseType;
      connection: Connection[DatabaseType];
      createdAt: Date;
      lastUsed: Date;
    }
  > = new Map();

  constructor(private maxConnections: number = 10) {}

  async createConnection(
    type: DatabaseType,
    config: ConnectionConfig[DatabaseType]
  ): Promise<string> {
    if (this.connections.size >= this.maxConnections) {
      throw new ConnectionError("Maximum number of connections reached");
    }

    const connectionId = `${type}_${Date.now()}`;
    const now = new Date();

    try {
      let connection: Connection[DatabaseType];

      switch (type) {
        case "mysql":
          connection = await mysql.createConnection(
            config as mysql.ConnectionOptions
          );
          break;
        case "postgresql":
          const pgClient = new Client(config as ClientConfig);
          await pgClient.connect();
          connection = pgClient;
          break;
        case "mssql":
          connection = await sql.connect(config as mssqlConfig);
          break;
        case "mongodb":
          const { uri, options } = config as ConnectionConfig["mongodb"];
          const mongoClient = new MongoClient(uri, options);
          await mongoClient.connect();
          connection = mongoClient;
          break;
        default:
          throw new ConnectionError(`Unsupported database type: ${type}`);
      }

      this.connections.set(connectionId, {
        type,
        connection,
        createdAt: now,
        lastUsed: now,
      });

      return connectionId;
    } catch (error) {
      throw new ConnectionError(
        `Failed to connect to ${type}: ${
          error instanceof Error ? error.message : ""
        }`,
        { cause: error }
      );
    }
  }

  async executeQuery<T = any>(
    connectionId: string,
    query: string,
    params: QueryParams = []
  ): Promise<T[]> {
    const connectionInfo = this.connections.get(connectionId);
    if (!connectionInfo) {
      throw new InvalidConnectionError("Connection not found");
    }

    connectionInfo.lastUsed = new Date();

    try {
      switch (connectionInfo.type) {
        case "mysql":
          const [rows] = await (
            connectionInfo.connection as mysql.Connection
          ).execute(query, params as any[]);
          return rows as T[];

        case "postgresql":
          const pgResult = await (connectionInfo.connection as Client).query(
            query,
            params as any[]
          );
          return pgResult.rows as T[];

        case "mssql":
          const mssqlRequest = (
            connectionInfo.connection as sql.ConnectionPool
          ).request();
          if (params && typeof params === "object" && !Array.isArray(params)) {
            for (const [key, value] of Object.entries(params)) {
              mssqlRequest.input(key, value);
            }
          }
          const mssqlResult = await mssqlRequest.query(query);
          return mssqlResult.recordset as T[];

        case "mongodb": {
          const [dbName, collectionName] = query.split(".");
          if (!dbName || !collectionName) {
            throw new QueryError(
              "MongoDB query must be in format 'database.collection'"
            );
          }

          const db = (connectionInfo.connection as MongoClient).db(dbName);
          const collection = db.collection(collectionName);

          const mongoParams = params as MongoQuery;
          switch (mongoParams.op) {
            case "find":
              return (await collection
                .find(mongoParams.filter || {}, mongoParams.options)
                .toArray()) as T[];
            case "insert":
              if (
                !mongoParams.documents ||
                !Array.isArray(mongoParams.documents)
              ) {
                throw new QueryError(
                  "Insert operation requires `documents` array"
                );
              }
              const insertResult = await collection.insertMany(
                mongoParams.documents
              );
              return [insertResult] as T[];
            case "update":
              const updateResult = await collection.updateMany(
                mongoParams.filter || {},
                mongoParams.update || {}
              );
              return [updateResult] as T[];
            case "delete":
              const deleteResult = await collection.deleteMany(
                mongoParams.filter || {}
              );
              return [deleteResult] as T[];
            default:
              throw new QueryError(
                `Unsupported MongoDB operation: ${mongoParams.op}`
              );
          }
        }

        default:
          throw new QueryError(
            `Query execution not supported for ${connectionInfo.type}`
          );
      }
    } catch (error) {
      throw new QueryError(
        `Query execution failed: ${
          error instanceof Error ? error.message : ""
        }`,
        { cause: error }
      );
    }
  }

  async closeConnection(connectionId: string): Promise<void> {
    const connectionInfo = this.connections.get(connectionId);
    if (!connectionInfo) return;

    try {
      switch (connectionInfo.type) {
        case "mysql":
          await (connectionInfo.connection as mysql.Connection).end();
          break;
        case "postgresql":
          await (connectionInfo.connection as Client).end();
          break;
        case "mssql":
          await (connectionInfo.connection as sql.ConnectionPool).close();
          break;
        case "mongodb":
          await (connectionInfo.connection as MongoClient).close();
          break;
      }
    } catch (error) {
      console.error(
        `Error closing connection ${connectionId}: ${
          error instanceof Error ? error.message : error
        }`
      );
    } finally {
      this.connections.delete(connectionId);
    }
  }

  async closeAllConnections(): Promise<void> {
    await Promise.all(
      Array.from(this.connections.keys()).map((id) => this.closeConnection(id))
    );
  }

  getConnectionCount(): number {
    return this.connections.size;
  }

  getConnectionInfo(connectionId: string) {
    const info = this.connections.get(connectionId);
    if (!info) return null;

    return {
      type: info.type,
      createdAt: info.createdAt,
      lastUsed: info.lastUsed,
      ageInMinutes: Math.floor((Date.now() - info.createdAt.getTime()) / 60000),
      idleInMinutes: Math.floor((Date.now() - info.lastUsed.getTime()) / 60000),
    };
  }

  cleanupIdleConnections(maxIdleMinutes: number): void {
    const now = Date.now();
    for (const [id, info] of this.connections) {
      const idle = (now - info.lastUsed.getTime()) / 60000;
      if (idle > maxIdleMinutes) {
        this.closeConnection(id);
      }
    }
  }
}
