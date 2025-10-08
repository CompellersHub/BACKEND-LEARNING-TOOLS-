import { uploadFile } from "../../global/entities";
import { connectDB, createMeasure, filterQuery } from "./interface";
import { DatabaseManager, DataTransformer, DAXEngine, FileProcessor } from "./tools";
export declare class AnalysisToolServices {
    private readonly fileProcessor;
    private readonly database;
    private readonly daxEngine;
    private readonly transform;
    constructor(fileProcessor: FileProcessor, database: DatabaseManager, daxEngine: DAXEngine, transform: DataTransformer);
    uploadFile(file: uploadFile, user?: {
        id: string;
    }): Promise<{
        dataSourceId: string;
        name: string;
        type: string;
        data: {
            columnName: string;
            dataType: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
            nullable: string;
            constraints: string;
        }[];
        fileType: string;
        metadata: {
            type?: string | any[];
            rowCount?: number;
        };
    }>;
    connectDatabase(data: connectDB, user: {
        id: string;
    }): Promise<{
        dataSourceId: string;
        name: string;
        type: string;
        databaseType: import("./tools").DatabaseType;
    }>;
    findAll(user: {
        id: string;
    }): Promise<{
        id: any;
        name: any;
        type: any;
        userId: {
            id: string;
        };
        fileType: any;
        databaseType: any;
        data: {
            columnName: string;
            dataType: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
            nullable: string;
            constraints: string;
        }[];
        createdAt: any;
        updatedAt: any;
    }[]>;
    searchColumn(data: {
        id: string;
        search: string;
    }): Promise<string[]>;
    createRelationship(data: {
        modelId: string;
        from: string;
        to: string;
        relationshipType: "one-to-many" | "one-to-one" | "many-to-many";
    }): Promise<void>;
    createMeasure(data: createMeasure): Promise<{
        [data.name]: any;
        results: any;
    }>;
    filterQuery(id: string, value: filterQuery[]): Promise<{
        [x: string]: {};
    }[]>;
    findOne(params: {
        id: string;
    }, user: {
        id: string;
    }): Promise<any>;
    executeQueryOnDatabase(data: {
        query: any;
        params: {
            id: string;
        };
    }, user: {
        id: string;
    }): Promise<{
        data: any[];
    }>;
    private transformDataDynamic;
    private joinName;
}
