"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAXEngine = void 0;
const typedi_1 = require("typedi");
let DAXEngine = class DAXEngine {
    constructor() {
        this.measures = new Map();
        this.calculatedColumns = new Map();
    }
    createMeasure(name, formula, table) {
        this.measures.set(name, { formula, table });
        return name;
    }
    createCalculatedColumn(name, formula, table) {
        this.calculatedColumns.set(name, { formula, table });
        return name;
    }
    evaluateMeasure(measureName, data, context = {}) {
        const measure = this.measures.get(measureName);
        if (!measure) {
            throw new Error(`Measure ${measureName} not found`);
        }
        return this.evaluateDAXExpression(measure.formula, data, context);
    }
    evaluateDAXExpression(expression, data, context = {}) {
        const functions = {
            SUM: (column) => this.sumColumn(data, column),
            COUNT: (column) => this.countColumn(data, column),
            AVERAGE: (column) => this.averageColumn(data, column),
            MAX: (column) => this.maxColumn(data, column),
            MIN: (column) => this.minColumn(data, column),
            DISTINCTCOUNT: (column) => this.distinctCountColumn(data, column),
        };
        for (const funcName of Object.keys(functions)) {
            const regex = new RegExp(`${funcName}\\(([^()]+?)\\)`, "g");
            expression = expression.replace(regex, (_, args) => {
                const arg = args.trim();
                return functions[funcName](arg);
            });
        }
        expression = expression.replace(/IF\((.*?),\s*(.*?),\s*(.*?)\)/g, (_, cond, trueVal, falseVal) => {
            const row = data[0];
            const result = this.evaluateCondition(cond, row);
            return result ? trueVal : falseVal;
        });
        try {
            const safeExpression = this.injectContext(expression, data[0]);
            return eval(safeExpression);
        }
        catch (e) {
            throw new Error(`Failed to evaluate expression: ${expression}`);
        }
    }
    injectContext(expr, row) {
        return expr.replace(/\[([^\]]+)\]/g, (_, field) => {
            const value = row[field];
            return typeof value === "string" ? `"${value}"` : value;
        });
    }
    sumColumn(data, column) {
        return data.reduce((sum, row) => sum + (Number(row[column]) || 0), 0);
    }
    countColumn(data, column) {
        return data.filter((row) => row[column] !== null && row[column] !== undefined).length;
    }
    averageColumn(data, column) {
        const sum = this.sumColumn(data, column);
        const count = this.countColumn(data, column);
        return count > 0 ? sum / count : 0;
    }
    maxColumn(data, column) {
        return Math.max(...data.map((row) => Number(row[column]) || 0));
    }
    minColumn(data, column) {
        return Math.min(...data.map((row) => Number(row[column]) || 0));
    }
    distinctCountColumn(data, column) {
        return new Set(data.map((row) => row[column])).size;
    }
    concatenateColumns(data, col1, col2) {
        return data.map((row) => `${row[col1]}${row[col2]}`);
    }
    evaluateCondition(condition, row) {
        const expr = this.injectContext(condition, row);
        try {
            return Boolean(eval(expr));
        }
        catch (e) {
            return false;
        }
    }
    parseExpression(expression) {
        const match = expression.match(/^\[([^\]]+)\] ([-+*%]) \[([^\]]+)\]$/);
        if (!match)
            return null;
        return {
            leftField: match[1],
            operator: match[2],
            rightField: match[3],
        };
    }
    computeExpression(data, leftField, operator, rightField) {
        const parseNumber = (value) => parseFloat(value.replace(",", "."));
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
};
exports.DAXEngine = DAXEngine;
exports.DAXEngine = DAXEngine = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], DAXEngine);
//# sourceMappingURL=dax.engine.js.map