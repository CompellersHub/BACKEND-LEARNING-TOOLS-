import { fileProcessing } from "../interface";
export declare class FileProcessor {
    processFile(filePath: Buffer, fileType: string): Promise<fileProcessing>;
    private processExcel;
    private processCSV;
    private processJSON;
    private processXML;
}
