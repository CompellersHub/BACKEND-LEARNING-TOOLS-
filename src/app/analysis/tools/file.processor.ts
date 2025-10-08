import csv from "csv-parser";
import fs from "fs";
import xml2js from "xml2js";
import { Service } from "typedi";
import { fileProcessing } from "../interface";
import Excel from "exceljs";
import { PassThrough } from "stream";

@Service()
export class FileProcessor {
  async processFile(
    filePath: Buffer,
    fileType: string
  ): Promise<fileProcessing> {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`File processing failed: ${error.message}`);
      }
    }
  }

  private async processExcel(filePath: Buffer): Promise<fileProcessing> {
    const workbook = new Excel.Workbook();
    // await workbook.xlsx.readFile(filePath);

    const data: Record<string, any[]> = {};
    const sheetNames: string[] = [];

    workbook.eachSheet((worksheet, sheetId) => {
      const sheetData: any[] = [];
      const headers: string[] = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
          row.eachCell((cell) => headers.push(cell.text));
        } else {
          const rowData: Record<string, any> = {};
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

  private async processCSV(fileBuffer: Buffer): Promise<fileProcessing> {
    return new Promise((resolve, reject) => {
      const results = [];
      let headers = [];

      // Create a stream from the Buffer
      const bufferStream = new PassThrough();
      bufferStream.end(fileBuffer);

      bufferStream
        .pipe(csv())
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
  // private async processCSV(filePath: Buffer): Promise<fileProcessing> {
  //   return new Promise((resolve, reject) => {
  //     const results = [];
  //     const headers = [];

  //     fs.createReadStream(filePath)
  //       .pipe(csv())
  //       .on("headers", (headerList) => {
  //         headers.push(...headerList);
  //       })
  //       .on("data", (row) => {
  //         results.push(row);
  //       })
  //       .on("end", () => {
  //         resolve({
  //           data: results,
  //           headers,
  //           metadata: { rowCount: results.length },
  //         });
  //       })
  //       .on("error", reject);
  //   });
  // }

  private async processJSON(filePath: Buffer): Promise<fileProcessing> {
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return { data: jsonData, metadata: { type: "json" } };
  }

  private async processXML(filePath: Buffer): Promise<fileProcessing> {
    const xmlData = fs.readFileSync(filePath, "utf8");
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);
    return { data: result, metadata: { type: "xml" } };
  }
}
