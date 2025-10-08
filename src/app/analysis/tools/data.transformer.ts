import moment from "moment";
import { Service } from "typedi";
import { DataRow, FilterCondition } from "../interface";

@Service()
export class DataTransformer {
  removeDuplicates<T extends DataRow>(data: T[], keyField?: keyof T): T[] {
    const seen = new Set<string>();
    return data.filter((item) => {
      const key = keyField ? String(item[keyField]) : JSON.stringify(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  removeBlanks<T extends DataRow>(data: T[], fields: (keyof T)[] = []): T[] {
    if (fields.length === 0) {
      return data.filter((item) =>
        Object.values(item).some(
          (value) => value !== null && value !== undefined && value !== ""
        )
      );
    }

    return data.filter((item) =>
      fields.every(
        (field) =>
          item[field] !== null &&
          item[field] !== undefined &&
          item[field] !== ""
      )
    );
  }

  splitColumn<T extends DataRow>(
    data: T[],
    sourceColumn: keyof T,
    delimiter: string,
    newColumns: string[]
  ): T[] {
    return data.map((item) => {
      const parts = String(item[sourceColumn]).split(delimiter);
      const newItem = { ...item } as DataRow;
      newColumns.forEach((colName, index) => {
        newItem[colName] = parts[index] || "";
      });
      return newItem as T;
    });
  }

  mergeColumns<T extends DataRow>(
    data: T[],
    sourceColumns: (keyof T)[],
    targetColumn: string,
    delimiter = " "
  ): T[] {
    return data.map((item) => {
      const newItem = { ...item } as DataRow;
      newItem[targetColumn] = sourceColumns
        .map((col) => item[col] || "")
        .join(delimiter);
      return newItem as T;
    });
  }

  changeDataType<T extends Record<string, any>>(
    data: T[],
    column: keyof T,
    targetType: "number" | "date" | "string" | "boolean"
  ): T[] {
    return data.map((item) => {
      const newItem = { ...item } as T;
      const value = item[column];

      switch (targetType) {
        case "number":
          newItem[column] = Number(value) as T[keyof T];
          break;
        case "date":
          newItem[column] = moment(value).toDate() as T[keyof T];
          break;
        case "string":
          newItem[column] = String(value) as T[keyof T];
          break;
        case "boolean":
          newItem[column] = Boolean(value) as T[keyof T];
          break;
        default:
          newItem[column] = value;
      }

      return newItem;
    });
  }

  filterRows<T extends DataRow>(
    data: T[],
    conditions: FilterCondition<T>[]
  ): T[] {
    return data.filter((item) => {
      return conditions.every((condition) => {
        const { field, operator, value } = condition;
        const itemValue = item[field];

        switch (operator) {
          case "equals":
            return itemValue === value;
          case "not_equals":
            return itemValue !== value;
          case "greater_than":
            return itemValue > value;
          case "less_than":
            return itemValue < value;
          case "contains":
            return String(itemValue).includes(value);
          case "starts_with":
            return String(itemValue).startsWith(value);
          case "ends_with":
            return String(itemValue).endsWith(value);
          default:
            return true;
        }
      });
    });
  }

  addCalculatedColumn<T extends DataRow>(
    data: T[],
    columnName: string,
    formula: string
  ): T[] {
    return data.map((item) => {
      const newItem = { ...item } as DataRow;
      try {
        const result = this.evaluateFormula(formula, item);
        newItem[columnName] = result;
      } catch {
        newItem[columnName] = null;
      }
      return newItem as T;
    });
  }

  evaluateFormula(formula: string, row: DataRow): any {
    let expression = formula;

    for (const key in row) {
      const regex = new RegExp(`\\[${key}\\]`, "g");
      const value = typeof row[key] === "string" ? `"${row[key]}"` : row[key];
      expression = expression.replace(regex, value);
    }

    try {
      return eval(expression); // ⚠ In production, use a safe parser like `mathjs`
    } catch (e) {
      return null;
    }
  }

  unpivotColumns<T extends DataRow>(
    data: T[],
    idColumns: (keyof T)[],
    valueColumns: (keyof T)[],
    variableColumn = "variable",
    valueColumn = "value"
  ): Record<string, any>[] {
    const result: Record<string, any>[] = [];

    data.forEach((row) => {
      valueColumns.forEach((col) => {
        const newRow: Record<string, any> = {};

        idColumns.forEach((idCol) => {
          newRow[idCol as string] = row[idCol];
        });

        newRow[variableColumn] = col;
        newRow[valueColumn] = row[col];

        result.push(newRow);
      });
    });

    return result;
  }
}
