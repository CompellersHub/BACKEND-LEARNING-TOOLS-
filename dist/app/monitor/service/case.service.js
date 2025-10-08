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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseMonitoringService = void 0;
const services_1 = require("../../../global/services");
const mongoose_1 = require("mongoose");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const interface_1 = require("../interface");
const monitor_service_1 = require("./monitor.service");
const mongoose_2 = require("mongoose");
const helpers_1 = require("../../../global/helpers");
let CaseMonitoringService = class CaseMonitoringService {
    constructor(escalateModel, financialModel, investigateModel, pepModel, sanctionModel, alert, caseMonitor, uploadService, monitorService) {
        this.escalateModel = escalateModel;
        this.financialModel = financialModel;
        this.investigateModel = investigateModel;
        this.pepModel = pepModel;
        this.sanctionModel = sanctionModel;
        this.alert = alert;
        this.caseMonitor = caseMonitor;
        this.uploadService = uploadService;
        this.monitorService = monitorService;
        this.filterManyCase = (query) => {
            const filter = {};
            if (query.search) {
                filter.$or = [];
                query.search.forEach((searchTerm) => {
                    if (mongoose_2.Types.ObjectId.isValid(searchTerm)) {
                        filter.$or.push({ _id: new mongoose_2.Types.ObjectId(searchTerm) });
                    }
                    else {
                        const regx = new RegExp(searchTerm, "i");
                        filter.$or.push({ question: regx }, { explanation: regx }, { type: regx });
                    }
                });
            }
            if (query.caseId)
                filter["caseId"] = { $in: query.caseId };
            if (query.status)
                filter["status"] = { $in: query.status };
            if (query.priority)
                filter["priority"] = { $in: query.priority };
            return filter;
        };
    }
    async createEscalate(dto) {
        try {
            const findAlert = await this.alert.findById(dto.alertId);
            if (!findAlert)
                throw new routing_controllers_1.NotFoundError("Alert not found");
            void this.createCase(findAlert, dto.escalationNotes, interface_1.selectedDecision.approve);
            return this.escalateModel.create(dto);
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError || error instanceof Error) {
                throw new routing_controllers_1.BadRequestError(error.message);
            }
            throw error;
        }
    }
    async createFinancial(dto, request) {
        try {
            const findAlert = await this.alert.findById(dto.alertId);
            if (!findAlert)
                throw new routing_controllers_1.NotFoundError("Alert not found");
            void this.createCase(findAlert, dto.finalDecisionRationale, dto.finalCaseDecision);
            if (Array.isArray(request.files) && request.files.length > 0) {
                const sowTasks = request.files
                    .filter((f) => f.fieldname.startsWith("sourceOfWealths"))
                    .map(async (f) => ({
                    name: this.joinName(f.originalname),
                    type: f.mimetype,
                    size: f.size,
                    link: await this.uploadService.upload(f),
                }));
                const sofTasks = request.files
                    .filter((f) => f.fieldname.startsWith("sourceOfFunds"))
                    .map(async (f) => ({
                    name: this.joinName(f.originalname),
                    type: f.mimetype,
                    size: f.size,
                    link: await this.uploadService.upload(f),
                }));
                const [sourceOfWealthDocs, sourceOfFundDocs] = await Promise.all([
                    Promise.all(sowTasks),
                    Promise.all(sofTasks),
                ]);
                dto.sourceOfWealths.document = sourceOfWealthDocs;
                dto.sourceOfFunds.document = sourceOfFundDocs;
            }
            return this.financialModel.create(dto);
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError || error instanceof Error) {
                throw new routing_controllers_1.BadRequestError(error.message);
            }
            throw error;
        }
    }
    async createInvestigation(dto, request) {
        try {
            const findAlert = await this.alert.findById(dto.alertId);
            if (!findAlert)
                throw new routing_controllers_1.NotFoundError("Alert not found");
            void this.createCase(findAlert, dto.investigationNote, dto.investigationDecision, dto.assignTo);
            if (dto.evidence.length) {
                dto.evidence = await Promise.all(dto.evidence.map(async (item, idx) => {
                    let document = item.document;
                    if (Array.isArray(request.files) && request.files.length > 0) {
                        for (const file of request.files) {
                            if (file.fieldname === `evidence[${idx}][document]`) {
                                document = {
                                    name: this.joinName(file.originalname),
                                    type: file.mimetype,
                                    size: file.size,
                                    link: await this.uploadService.upload(file),
                                };
                            }
                        }
                    }
                    return {
                        ...item,
                        document,
                    };
                }));
            }
            return this.investigateModel.create(dto);
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError || error instanceof Error) {
                throw new routing_controllers_1.BadRequestError(error.message);
            }
            throw error;
        }
    }
    async createPep(dto, request) {
        try {
            const findAlert = await this.alert.findById(dto.alertId);
            if (!findAlert)
                throw new routing_controllers_1.NotFoundError("Alert not found");
            void this.createCase(findAlert, dto.finalDecisionRationale, dto.finalCaseDecision);
            if (Array.isArray(request.files) && request.files.length > 0) {
                const documents = await Promise.all(request.files.map(async (file) => ({
                    type: file.mimetype,
                    size: file.size,
                    name: this.joinName(file.originalname),
                    link: await this.uploadService.upload(file),
                })));
                dto.documentUploadAndSupportingEvidence = documents;
            }
            return this.pepModel.create(dto);
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError || error instanceof Error) {
                throw new routing_controllers_1.BadRequestError(error.message);
            }
            throw error;
        }
    }
    async createSanction(dto, request) {
        try {
            const findAlert = await this.alert.findById(dto.alertId);
            if (!findAlert)
                throw new routing_controllers_1.NotFoundError("Alert not found");
            void this.createCase(findAlert, dto.finalDecisionRationale, dto.finalCaseDecision);
            if (Array.isArray(request.files) && request.files.length > 0) {
                const documents = await Promise.all(request.files.map(async (file) => ({
                    type: file.mimetype,
                    size: file.size,
                    name: this.joinName(file.originalname),
                    link: await this.uploadService.upload(file),
                })));
                dto.identifyDocuments = documents;
            }
            return this.sanctionModel.create(dto);
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError || error instanceof Error) {
                throw new routing_controllers_1.BadRequestError(error.message);
            }
            throw error;
        }
    }
    async updateCase(dto, id) {
        try {
            const findCase = await this.caseMonitor.findById(id);
            if (!findCase)
                throw new routing_controllers_1.NotFoundError("Case not found");
            return this.caseMonitor
                .findByIdAndUpdate(id, { ...dto }, { new: true })
                .exec();
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError || error instanceof Error) {
                throw new routing_controllers_1.BadRequestError(error.message);
            }
            throw error;
        }
    }
    async addOrRemoveEvidence(dto) {
        try {
            const findCase = await this.caseMonitor.findById(dto.id);
            if (!findCase)
                throw new routing_controllers_1.NotFoundError("Case not found");
            const { riskLevel, status, transactionRecord, type } = dto;
            if (type === "add") {
                await this.caseMonitor.updateOne({ _id: dto.id }, {
                    $push: {
                        evidenceCollecting: { riskLevel, status, transactionRecord },
                    },
                });
                return { message: "Item added successful" };
            }
            else if (type === "delete") {
                await this.caseMonitor.updateOne({ _id: dto.id }, {
                    $pull: {
                        evidenceCollecting: { riskLevel, status, transactionRecord },
                    },
                });
                return { message: "Item remove successful" };
            }
            else {
                throw new routing_controllers_1.BadRequestError("Invalid operation type");
            }
        }
        catch (error) {
            if (error instanceof mongoose_1.MongooseError || error instanceof Error) {
                throw new routing_controllers_1.BadRequestError(error.message);
            }
            throw error;
        }
    }
    async findManyCases(query) {
        try {
            return (0, helpers_1.findManyWrapper)(this.caseMonitor, this.filterManyCase(query), query);
        }
        catch (error) {
            throw error;
        }
    }
    async findOneCase(query) {
        try {
            const { options, filter } = this.filterOneCase(query);
            return (0, helpers_1.findOneWrapper)(this.caseMonitor.findOne(filter), options, "Case Model");
        }
        catch (error) {
            throw error;
        }
    }
    async createCase(data, decisionRationale, caseDecision, assignTo = "") {
        const result = await this.monitorService.findOneProfile({
            _id: data.userId,
        });
        if (!result)
            return;
        const details = {
            caseId: "001",
            monitoring: data._id,
            profile: data.userId,
            status: "pending",
            assignTo,
            priority: this.riskLevel(data.riskScore),
            progress: 0,
            customerSince: result.joinDate,
            pepStatus: result.pepStatus,
            adverseMedia: result.adverseMedia,
            lastKycUpdate: new Date(),
            sanctions: result.sanctionsFlags,
            totalTransaction: result.transaction.length,
            totalAmount: result.transaction.reduce((sum, tx) => sum + tx.amount, 0),
            riskScore: result.riskScore,
            evidenceCollecting: [
                {
                    transactionRecord: result.totalTransactions,
                    riskLevel: this.riskLevel(data.riskScore),
                    status: data.status,
                },
            ],
            decisionRationale: decisionRationale,
            caseDecision: caseDecision,
        };
        const count = await this.caseMonitor.countDocuments();
        const number = String(count).padStart(2, "0");
        await this.caseMonitor.create({ ...details, caseId: `CASE-${number + 1}` });
    }
    filterOneCase(query) {
        const { lean, session, increaseView, populate, select, ...filter } = query;
        const options = {
            lean: true,
            session,
            select,
            populate,
        };
        return { options, filter };
    }
    riskLevel(score) {
        if (score <= 30)
            return "Low";
        if (score <= 65)
            return "Medium";
        return "High";
    }
    joinName(name) {
        return name.replace(/\s+/g, "-").toLowerCase();
    }
};
exports.CaseMonitoringService = CaseMonitoringService;
exports.CaseMonitoringService = CaseMonitoringService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("escalateModel")),
    __param(1, (0, typedi_1.Inject)("financialModel")),
    __param(2, (0, typedi_1.Inject)("investigateModel")),
    __param(3, (0, typedi_1.Inject)("pEPModel")),
    __param(4, (0, typedi_1.Inject)("sanctionModel")),
    __param(5, (0, typedi_1.Inject)("alertModel")),
    __param(6, (0, typedi_1.Inject)("caseModel")),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, services_1.UploadService,
        monitor_service_1.MonitorService])
], CaseMonitoringService);
//# sourceMappingURL=case.service.js.map