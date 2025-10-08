"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProcessor = void 0;
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const xml2js_1 = __importDefault(require("xml2js"));
const typedi_1 = require("typedi");
const exceljs_1 = __importDefault(require("exceljs"));
const stream_1 = require("stream");
let FileProcessor = class FileProcessor {
    async processFile(filePath, fileType) {
        try {
            switch (fileType.toLowerCase()) {
                case "xlsx":
                case "xls":
                    return await this.processExcel(filePath);
                case "csv":
                    return await this.processCSV(filePath);
                case "json":
                    return await this.processJSON(filePath);
                case "xml":
                    return await this.processXML(filePath);
                default:
                    throw new Error(`Unsupported file type: ${fileType}`);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(`File processing failed: ${error.message}`);
            }
        }
    }
    async processExcel(filePath) {
        const workbook = new exceljs_1.default.Workbook();
        const data = {};
        const sheetNames = [];
        workbook.eachSheet((worksheet, sheetId) => {
            const sheetData = [];
            const headers = [];
            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) {
                    row.eachCell((cell) => headers.push(cell.text));
                }
                else {
                    const rowData = {};
                    row.eachCell((cell, colNumber) => {
                        rowData[headers[colNumber - 1]] = cell.text;
                    });
                    sheetData.push(rowData);
                }
            });
            data[worksheet.name] = sheetData;
            sheetNames.push(worksheet.name);
        });
        return { data: data, metadata: { type: sheetNames } };
    }
    async processCSV(fileBuffer) {
        return new Promise((resolve, reject) => {
            const results = [];
            let headers = [];
            const bufferStream = new stream_1.PassThrough();
            bufferStream.end(fileBuffer);
            bufferStream
                .pipe((0, csv_parser_1.default)())
                .on("headers", (headerList) => {
                headers = headerList;
            })
                .on("data", (row) => {
                results.push(row);
            })
                .on("end", () => {
                resolve({
                    data: results,
                    headers,
                    metadata: { rowCount: results.length },
                });
            })
                .on("error", reject);
        });
    }
    async processJSON(filePath) {
        const jsonData = JSON.parse(fs_1.default.readFileSync(filePath, "utf8"));
        return { data: jsonData, metadata: { type: "json" } };
    }
    async processXML(filePath) {
        const xmlData = fs_1.default.readFileSync(filePath, "utf8");
        const parser = new xml2js_1.default.Parser();
        const result = await parser.parseStringPromise(xmlData);
        return { data: result, metadata: { type: "xml" } };
    }
};
exports.FileProcessor = FileProcessor;
exports.FileProcessor = FileProcessor = __decorate([
    (0, typedi_1.Service)()
], FileProcessor);
//# sourceMappingURL=file.processor.js.map