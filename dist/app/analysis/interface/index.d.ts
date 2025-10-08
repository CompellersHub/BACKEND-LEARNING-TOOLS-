import { ConnectionConfig, DatabaseType } from "../tools";
export * from "./analysis.interface";
export declare enum connectionType {
    mysql = "mysql",
    postgresql = "postgresql",
    mssql = "mssql",
    mongodb = "mongodb"
}
export type fileProcessing = {
    data: any;
    headers?: any;
    metadata: {
        type?: string | any[];
        rowCount?: number;
    };
};
export type connectDB = {
    type: DatabaseType;
    name: string;
    config: ConnectionConfig[DatabaseType];
};
