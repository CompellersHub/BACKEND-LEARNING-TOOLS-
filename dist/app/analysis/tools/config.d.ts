import mysql from "mysql2/promise";
import { ClientConfig } from "pg";
import { config as mssqlConfig } from "mssql";
import { MongoClientOptions } from "mongodb";
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
type QueryParams = any[] | Record<string, any>;
export declare class DatabaseManager {
    private maxConnections;
    private connections;
    constructor(maxConnections?: number);
    createConnection(type: DatabaseType, config: ConnectionConfig[DatabaseType]): Promise<string>;
    executeQuery<T = any>(connectionId: string, query: string, params?: QueryParams): Promise<T[]>;
    closeConnection(connectionId: string): Promise<void>;
    closeAllConnections(): Promise<void>;
    getConnectionCount(): number;
    getConnectionInfo(connectionId: string): {
        type: DatabaseType;
        createdAt: Date;
        lastUsed: Date;
        ageInMinutes: number;
        idleInMinutes: number;
    };
    cleanupIdleConnections(maxIdleMinutes: number): void;
}
export {};
