"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseManager = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const pg_1 = require("pg");
const mssql_1 = __importDefault(require("mssql"));
const mongodb_1 = require("mongodb");
const typedi_1 = require("typedi");
class DatabaseError extends Error {
    constructor(message, options) {
        super(message);
        this.name = this.constructor.name;
        if (options?.cause) {
            this.cause = options.cause;
        }
    }
}
class ConnectionError extends DatabaseError {
}
class QueryError extends DatabaseError {
}
class InvalidConnectionError extends DatabaseError {
}
let DatabaseManager = class DatabaseManager {
    constructor(maxConnections = 10) {
        this.maxConnections = maxConnections;
        this.connections = new Map();
    }
    async createConnection(type, config) {
        if (this.connections.size >= this.maxConnections) {
            throw new ConnectionError("Maximum number of connections reached");
        }
        const connectionId = `${type}_${Date.now()}`;
        const now = new Date();
        try {
            let connection;
            switch (type) {
                case "mysql":
                    connection = await promise_1.default.createConnection(config);
                    break;
                case "postgresql":
                    const pgClient = new pg_1.Client(config);
                    await pgClient.connect();
                    connection = pgClient;
                    break;
                case "mssql":
                    connection = await mssql_1.default.connect(config);
                    break;
                case "mongodb":
                    const { uri, options } = config;
                    const mongoClient = new mongodb_1.MongoClient(uri, options);
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
        }
        catch (error) {
            throw new ConnectionError(`Failed to connect to ${type}: ${error instanceof Error ? error.message : ""}`, { cause: error });
        }
    }
    async executeQuery(connectionId, query, params = []) {
        const connectionInfo = this.connections.get(connectionId);
        if (!connectionInfo) {
            throw new InvalidConnectionError("Connection not found");
        }
        connectionInfo.lastUsed = new Date();
        try {
            switch (connectionInfo.type) {
                case "mysql":
                    const [rows] = await connectionInfo.connection.execute(query, params);
                    return rows;
                case "postgresql":
                    const pgResult = await connectionInfo.connection.query(query, params);
                    return pgResult.rows;
                case "mssql":
                    const mssqlRequest = connectionInfo.connection.request();
                    if (params && typeof params === "object" && !Array.isArray(params)) {
                        for (const [key, value] of Object.entries(params)) {
                            mssqlRequest.input(key, value);
                        }
                    }
                    const mssqlResult = await mssqlRequest.query(query);
                    return mssqlResult.recordset;
                case "mongodb": {
                    const [dbName, collectionName] = query.split(".");
                    if (!dbName || !collectionName) {
                        throw new QueryError("MongoDB query must be in format 'database.collection'");
                    }
                    const db = connectionInfo.connection.db(dbName);
                    const collection = db.collection(collectionName);
                    const mongoParams = params;
                    switch (mongoParams.op) {
                        case "find":
                            return (await collection
                                .find(mongoParams.filter || {}, mongoParams.options)
                                .toArray());
                        case "insert":
                            if (!mongoParams.documents ||
                                !Array.isArray(mongoParams.documents)) {
                                throw new QueryError("Insert operation requires `documents` array");
                            }
                            const insertResult = await collection.insertMany(mongoParams.documents);
                            return [insertResult];
                        case "update":
                            const updateResult = await collection.updateMany(mongoParams.filter || {}, mongoParams.update || {});
                            return [updateResult];
                        case "delete":
                            const deleteResult = await collection.deleteMany(mongoParams.filter || {});
                            return [deleteResult];
                        default:
                            throw new QueryError(`Unsupported MongoDB operation: ${mongoParams.op}`);
                    }
                }
                default:
                    throw new QueryError(`Query execution not supported for ${connectionInfo.type}`);
            }
        }
        catch (error) {
            throw new QueryError(`Query execution failed: ${error instanceof Error ? error.message : ""}`, { cause: error });
        }
    }
    async closeConnection(connectionId) {
        const connectionInfo = this.connections.get(connectionId);
        if (!connectionInfo)
            return;
        try {
            switch (connectionInfo.type) {
                case "mysql":
                    await connectionInfo.connection.end();
                    break;
                case "postgresql":
                    await connectionInfo.connection.end();
                    break;
                case "mssql":
                    await connectionInfo.connection.close();
                    break;
                case "mongodb":
                    await connectionInfo.connection.close();
                    break;
            }
        }
        catch (error) {
            console.error(`Error closing connection ${connectionId}: ${error instanceof Error ? error.message : error}`);
        }
        finally {
            this.connections.delete(connectionId);
        }
    }
    async closeAllConnections() {
        await Promise.all(Array.from(this.connections.keys()).map((id) => this.closeConnection(id)));
    }
    getConnectionCount() {
        return this.connections.size;
    }
    getConnectionInfo(connectionId) {
        const info = this.connections.get(connectionId);
        if (!info)
            return null;
        return {
            type: info.type,
            createdAt: info.createdAt,
            lastUsed: info.lastUsed,
            ageInMinutes: Math.floor((Date.now() - info.createdAt.getTime()) / 60000),
            idleInMinutes: Math.floor((Date.now() - info.lastUsed.getTime()) / 60000),
        };
    }
    cleanupIdleConnections(maxIdleMinutes) {
        const now = Date.now();
        for (const [id, info] of this.connections) {
            const idle = (now - info.lastUsed.getTime()) / 60000;
            if (idle > maxIdleMinutes) {
                this.closeConnection(id);
            }
        }
    }
};
exports.DatabaseManager = DatabaseManager;
exports.DatabaseManager = DatabaseManager = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [Number])
], DatabaseManager);
//# sourceMappingURL=config.js.map