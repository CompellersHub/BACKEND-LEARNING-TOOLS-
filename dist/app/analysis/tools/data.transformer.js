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
exports.DataTransformer = void 0;
const moment_1 = __importDefault(require("moment"));
const typedi_1 = require("typedi");
let DataTransformer = class DataTransformer {
    removeDuplicates(data, keyField) {
        const seen = new Set();
        return data.filter((item) => {
            const key = keyField ? String(item[keyField]) : JSON.stringify(item);
            if (seen.has(key))
                return false;
            seen.add(key);
            return true;
        });
    }
    removeBlanks(data, fields = []) {
        if (fields.length === 0) {
            return data.filter((item) => Object.values(item).some((value) => value !== null && value !== undefined && value !== ""));
        }
        return data.filter((item) => fields.every((field) => item[field] !== null &&
            item[field] !== undefined &&
            item[field] !== ""));
    }
    splitColumn(data, sourceColumn, delimiter, newColumns) {
        return data.map((item) => {
            const parts = String(item[sourceColumn]).split(delimiter);
            const newItem = { ...item };
            newColumns.forEach((colName, index) => {
                newItem[colName] = parts[index] || "";
            });
            return newItem;
        });
    }
    mergeColumns(data, sourceColumns, targetColumn, delimiter = " ") {
        return data.map((item) => {
            const newItem = { ...item };
            newItem[targetColumn] = sourceColumns
                .map((col) => item[col] || "")
                .join(delimiter);
            return newItem;
        });
    }
    changeDataType(data, column, targetType) {
        return data.map((item) => {
            const newItem = { ...item };
            const value = item[column];
            switch (targetType) {
                case "number":
                    newItem[column] = Number(value);
                    break;
                case "date":
                    newItem[column] = (0, moment_1.default)(value).toDate();
                    break;
                case "string":
                    newItem[column] = String(value);
                    break;
                case "boolean":
                    newItem[column] = Boolean(value);
                    break;
                default:
                    newItem[column] = value;
            }
            return newItem;
        });
    }
    filterRows(data, conditions) {
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
    addCalculatedColumn(data, columnName, formula) {
        return data.map((item) => {
            const newItem = { ...item };
            try {
                const result = this.evaluateFormula(formula, item);
                newItem[columnName] = result;
            }
            catch {
                newItem[columnName] = null;
            }
            return newItem;
        });
    }
    evaluateFormula(formula, row) {
        let expression = formula;
        for (const key in row) {
            const regex = new RegExp(`\\[${key}\\]`, "g");
            const value = typeof row[key] === "string" ? `"${row[key]}"` : row[key];
            expression = expression.replace(regex, value);
        }
        try {
            return eval(expression);
        }
        catch (e) {
            return null;
        }
    }
    unpivotColumns(data, idColumns, valueColumns, variableColumn = "variable", valueColumn = "value") {
        const result = [];
        data.forEach((row) => {
            valueColumns.forEach((col) => {
                const newRow = {};
                idColumns.forEach((idCol) => {
                    newRow[idCol] = row[idCol];
                });
                newRow[variableColumn] = col;
                newRow[valueColumn] = row[col];
                result.push(newRow);
            });
        });
        return result;
    }
};
exports.DataTransformer = DataTransformer;
exports.DataTransformer = DataTransformer = __decorate([
    (0, typedi_1.Service)()
], DataTransformer);
//# sourceMappingURL=data.transformer.js.map