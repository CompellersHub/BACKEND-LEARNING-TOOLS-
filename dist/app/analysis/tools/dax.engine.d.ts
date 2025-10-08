import { MathOperator } from "../interface";
export declare class DAXEngine {
    private measures;
    private calculatedColumns;
    constructor();
    createMeasure(name: string, formula: string, table: string): string;
    createCalculatedColumn(name: string, formula: string, table: string): string;
    evaluateMeasure(measureName: string, data: any[], context?: {}): any;
    evaluateDAXExpression(expression: string, data: any[], context?: {}): any;
    injectContext(expr: string, row: any): string;
    sumColumn(data: any[], column: string): number;
    countColumn(data: any[], column: string): number;
    averageColumn(data: any[], column: string): number;
    maxColumn(data: any[], column: string): number;
    minColumn(data: any[], column: string): number;
    distinctCountColumn(data: any[], column: string): number;
    concatenateColumns(data: any[], col1: string, col2: string): string[];
    evaluateCondition(condition: string, row: any): boolean;
    parseExpression(expression: string): {
        leftField: string;
        operator: MathOperator;
        rightField: string;
    } | null;
    computeExpression(data: Record<string, string>, leftField: string, operator: MathOperator, rightField: string): number;
}
