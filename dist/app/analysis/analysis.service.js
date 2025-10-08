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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalysisToolServices = void 0;
const path_1 = __importDefault(require("path"));
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const uuid_1 = require("uuid");
const tools_1 = require("./tools");
const dataSources = new Map();
let AnalysisToolServices = class AnalysisToolServices {
    constructor(fileProcessor, database, daxEngine, transform) {
        this.fileProcessor = fileProcessor;
        this.database = database;
        this.daxEngine = daxEngine;
        this.transform = transform;
        this.transformDataDynamic = (data) => {
            return Object.entries(data).map(([key, value]) => {
                const cleanKey = key.replace("?", "");
                return {
                    columnName: cleanKey,
                    dataType: typeof value,
                    nullable: "yes",
                    constraints: "",
                };
            });
        };
    }
    async uploadFile(file, user) {
        try {
            const joinName = this.joinName(file.originalname);
            const fileExtension = path_1.default.extname(joinName).slice(1);
            const processedData = await this.fileProcessor.processFile(file.buffer, fileExtension);
            const dataSourceId = (0, uuid_1.v4)();
            const dataSource = {
                id: dataSourceId,
                name: joinName,
                type: "file",
                fileType: fileExtension,
                filePath: file.path,
                data: processedData?.data,
                userId: "12345",
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            dataSources.set(dataSourceId, dataSource);
            const result = {
                dataSourceId,
                name: dataSource.name,
                type: dataSource.type,
                data: this.transformDataDynamic(processedData.data[0]),
                fileType: dataSource.fileType,
                metadata: processedData?.metadata,
            };
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async connectDatabase(data, user) {
        const { type, config, name } = data;
        try {
            const connectionId = await this.database.createConnection(type, config[type]);
            const dataSourceId = (0, uuid_1.v4)();
            const dataSource = {
                id: dataSourceId,
                name: name || `${type}_connection`,
                type: "database",
                databaseType: type,
                connectionId,
                config: { ...config, password: undefined },
                userId: user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            dataSources.set(dataSourceId, dataSource);
            const result = {
                dataSourceId,
                name: dataSource.name,
                type: dataSource.type,
                databaseType: dataSource.databaseType,
            };
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(user) {
        try {
            const userDataSources = Array.from(dataSources.values())
                .filter((ds) => ds.userId === user.id)
                .map((ds) => {
                const tran = this.transformDataDynamic(ds.data[0]);
                return {
                    id: ds.id,
                    name: ds.name,
                    type: ds.type,
                    userId: user,
                    fileType: ds.fileType,
                    databaseType: ds.databaseType,
                    data: tran,
                    createdAt: ds.createdAt,
                    updatedAt: ds.updatedAt,
                };
            });
            return userDataSources;
        }
        catch (error) {
            throw error;
        }
    }
    async searchColumn(data) {
        const { id, search } = data;
        const dataSource = dataSources.get(id);
        const source = dataSource.data;
        console.log(source);
        if (!dataSource || !Array.isArray(source)) {
            throw new routing_controllers_1.NotFoundError("Data source not found or invalid");
        }
        if (source.length === 0) {
            return [];
        }
        const columns = Object.keys(source[0] || {});
        return columns.filter((col) => {
            console.log(col);
            return col.toLowerCase().includes(search.toLowerCase());
        });
    }
    async createRelationship(data) {
        const { from, to, relationshipType } = data;
    }
    async createMeasure(data) {
        const parsed = this.daxEngine.parseExpression(data.expression);
        if (!parsed)
            throw new routing_controllers_1.ForbiddenError("Invalid expression format");
        const dataSource = dataSources.get(data.tableId);
        const results = dataSource.data.map((item) => this.daxEngine.computeExpression(item, parsed.leftField, parsed.operator, parsed.rightField));
        const total = results.reduce((sum, val) => sum + val, 0);
        return { [data.name]: total, results };
    }
    async filterQuery(id, value) {
        const { data } = await this.findOne({ id }, { id: "12345" });
        return this.transform.filterRows(data, value);
    }
    async findOne(params, user) {
        try {
            const dataSource = dataSources.get(params.id);
            if (!dataSource || dataSource.userId !== user.id) {
                throw new routing_controllers_1.NotFoundError("Data source not found");
            }
            return dataSource;
        }
        catch (error) {
            throw error;
        }
    }
    async executeQueryOnDatabase(data, user) {
        try {
            const { query, params } = data;
            const dataSource = dataSources.get(params.id);
            if (!dataSource || dataSource.userId !== user.id) {
                throw new routing_controllers_1.NotFoundError("Data source not found");
            }
            if (dataSource.type !== "database") {
                throw new routing_controllers_1.UnauthorizedError("Query only supported for database sources");
            }
            const result = await this.database.executeQuery(dataSource.connectionId, query, params);
            return { data: result };
        }
        catch (error) {
            throw error;
        }
    }
    joinName(name) {
        return name.replace(/\s+/g, "-").toLowerCase();
    }
};
exports.AnalysisToolServices = AnalysisToolServices;
exports.AnalysisToolServices = AnalysisToolServices = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [tools_1.FileProcessor,
        tools_1.DatabaseManager,
        tools_1.DAXEngine,
        tools_1.DataTransformer])
], AnalysisToolServices);
//# sourceMappingURL=analysis.service.js.map