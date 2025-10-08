import { DataRow, FilterCondition } from "../interface";
export declare class DataTransformer {
    removeDuplicates<T extends DataRow>(data: T[], keyField?: keyof T): T[];
    removeBlanks<T extends DataRow>(data: T[], fields?: (keyof T)[]): T[];
    splitColumn<T extends DataRow>(data: T[], sourceColumn: keyof T, delimiter: string, newColumns: string[]): T[];
    mergeColumns<T extends DataRow>(data: T[], sourceColumns: (keyof T)[], targetColumn: string, delimiter?: string): T[];
    changeDataType<T extends Record<string, any>>(data: T[], column: keyof T, targetType: "number" | "date" | "string" | "boolean"): T[];
    filterRows<T extends DataRow>(data: T[], conditions: FilterCondition<T>[]): T[];
    addCalculatedColumn<T extends DataRow>(data: T[], columnName: string, formula: string): T[];
    evaluateFormula(formula: string, row: DataRow): any;
    unpivotColumns<T extends DataRow>(data: T[], idColumns: (keyof T)[], valueColumns: (keyof T)[], variableColumn?: string, valueColumn?: string): Record<string, any>[];
}
