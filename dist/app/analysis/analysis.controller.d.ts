import { AnalysisToolServices } from "./analysis.service";
import { uploadFile } from "../../global/entities";
import { CreateMeasure, searchData } from "./dto";
export declare class AnalysisToolsController {
    private toolServices;
    constructor(toolServices: AnalysisToolServices);
    uploadfile(file: uploadFile): Promise<{
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
    findMany(): Promise<{
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
    SearchColumn(param: searchData): Promise<string[]>;
    createMeasure(body: CreateMeasure): Promise<{
        [x: string]: any;
        results: any;
    }>;
}
