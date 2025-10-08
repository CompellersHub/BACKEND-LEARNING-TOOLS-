import { Service } from "typedi";
import { MathOperator } from "../interface";

@Service()
export class DAXEngine {
  private measures: Map<string, { formula: string; table: string }>;
  private calculatedColumns: Map<string, { formula: string; table: string }>;

  constructor() {
    this.measures = new Map();
    this.calculatedColumns = new Map();
  }

  createMeasure(name: string, formula: string, table: string) {
    this.measures.set(name, { formula, table });
    return name;
  }

  createCalculatedColumn(name: string, formula: string, table: string) {
    this.calculatedColumns.set(name, { formula, table });
    return name;
  }

  evaluateMeasure(measureName: string, data: any[], context = {}) {
    const measure = this.measures.get(measureName);
    if (!measure) {
      throw new Error(`Measure ${measureName} not found`);
    }
    return this.evaluateDAXExpression(measure.formula, data, context);
  }

  evaluateDAXExpression(expression: string, data: any[], context = {}): any {
    const functions: Record<string, (...args: string[]) => any> = {
      SUM: (column) => this.sumColumn(data, column),
      COUNT: (column) => this.countColumn(data, column),
      AVERAGE: (column) => this.averageColumn(data, column),
      MAX: (column) => this.maxColumn(data, column),
      MIN: (column) => this.minColumn(data, column),
      DISTINCTCOUNT: (column) => this.distinctCountColumn(data, column),
    };

    // Replace function calls like SUM(Amount)
    for (const funcName of Object.keys(functions)) {
      const regex = new RegExp(`${funcName}\\(([^()]+?)\\)`, "g");
      expression = expression.replace(regex, (_, args) => {
        const arg = args.trim();
        return functions[funcName](arg);
      });
    }

    // Simple IF statement like: IF([Sales] > 1000, "High", "Low")
    expression = expression.replace(
      /IF\((.*?),\s*(.*?),\s*(.*?)\)/g,
      (_, cond, trueVal, falseVal) => {
        const row = data[0]; // Just use first row for now
        const result = this.evaluateCondition(cond, row);
        return result ? trueVal : falseVal;
      }
    );

    // Evaluate final expression (safe)
    try {
      const safeExpression = this.injectContext(expression, data[0]);
      return eval(safeExpression); // ⚠ Use a parser in real systems
    } catch (e) {
      throw new Error(`Failed to evaluate expression: ${expression}`);
    }
  }

  injectContext(expr: string, row: any): string {
    return expr.replace(/\[([^\]]+)\]/g, (_, field) => {
      const value = row[field];
      return typeof value === "string" ? `"${value}"` : value;
    });
  }

  sumColumn(data: any[], column: string): number {
    return data.reduce((sum, row) => sum + (Number(row[column]) || 0), 0);
  }

  countColumn(data: any[], column: string): number {
    return data.filter(
      (row) => row[column] !== null && row[column] !== undefined
    ).length;
  }

  averageColumn(data: any[], column: string): number {
    const sum = this.sumColumn(data, column);
    const count = this.countColumn(data, column);
    return count > 0 ? sum / count : 0;
  }

  maxColumn(data: any[], column: string): number {
    return Math.max(...data.map((row) => Number(row[column]) || 0));
  }

  minColumn(data: any[], column: string): number {
    return Math.min(...data.map((row) => Number(row[column]) || 0));
  }

  distinctCountColumn(data: any[], column: string): number {
    return new Set(data.map((row) => row[column])).size;
  }

  // You may want to expose this separately if needed
  concatenateColumns(data: any[], col1: string, col2: string): string[] {
    return data.map((row) => `${row[col1]}${row[col2]}`);
  }

  evaluateCondition(condition: string, row: any): boolean {
    const expr = this.injectContext(condition, row);
    try {
      return Boolean(eval(expr));
    } catch (e) {
      return false;
    }
  }

  parseExpression(expression: string): {
    leftField: string;
    operator: MathOperator;
    rightField: string;
  } | null {
    const match = expression.match(/^\[([^\]]+)\] ([-+*%]) \[([^\]]+)\]$/);
    if (!match) return null;

    return {
      leftField: match[1], // e.g., "Revenue"
      operator: match[2] as MathOperator, // e.g., "-"
      rightField: match[3], // e.g., "Cost"
    };
  }

  computeExpression(
    data: Record<string, string>,
    leftField: string,
    operator: MathOperator,
    rightField: string
  ): number {
    // Convert European decimal format (e.g., "0,95" → 0.95)
    const parseNumber = (value: string) => parseFloat(value.replace(",", "."));

    const leftValue = parseNumber(data[leftField]);
    const rightValue = parseNumber(data[rightField]);

    switch (operator) {
      case "-":
        return leftValue - rightValue;
      case "+":
        return leftValue + rightValue;
      case "*":
        return leftValue * rightValue;
      case "%":
        return leftValue % rightValue;
      default:
        throw new Error(`Invalid operator: ${operator}`);
    }
  }
}
