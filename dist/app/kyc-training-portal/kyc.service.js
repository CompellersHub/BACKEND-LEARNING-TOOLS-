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
exports.KycTrainingPortalService = void 0;
const helpers_1 = require("../../global/helpers");
const services_1 = require("../../global/services");
const mongoose_1 = require("mongoose");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const interface_1 = require("./interface");
let KycTrainingPortalService = class KycTrainingPortalService {
    constructor(trainerModel, uploadService) {
        this.trainerModel = trainerModel;
        this.uploadService = uploadService;
        this.UPLOAD_CONCURRENCY = 3;
        this.BATCH_DELAY_MS = 50;
        this.expectedFiles = [
            "annualReportDocument",
            "incorporationCertificateDocument",
            "listOfDirectorsDocument",
            "shareholdersDocument",
            "memorandumDocument",
            "natureOfBusinessDocument",
            "proofOfIdDocument",
            "proofOfIdUboDocument",
            "proofOfListingDocument",
            "proofOfRegulationDocument",
            "sanctionScreeningDocument",
            "sanctionScreeningUboDocument",
        ];
    }
    async create(body, request) {
        try {
            const files = Array.isArray(request.files) ? request.files : [];
            const caseId = await this.generateCaseId();
            const starting = new Date(new Date().getTime() + 5 * 60 * 1000);
            const response = await this.trainerModel.create({
                caseId,
                ...body,
                status: interface_1.kycStatus.queued,
                submittedDate: Date.now(),
            });
            void services_1.agenda.schedule(starting, services_1.Jobs.kyc, {
                body,
                files: files.map((file) => ({
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    buffer: file.buffer.toString("base64"),
                    fieldname: file.fieldname,
                    size: file.size,
                })),
                caseId,
                when: "5 minutes after",
            });
            return response;
        }
        catch (error) {
            if (error instanceof mongoose.conn.Error.CastError) {
                console.log({ error });
                throw new routing_controllers_1.BadRequestError(error.message);
            }
            throw error;
        }
    }
    async kycScheduleCreate(body, files, caseId) {
        try {
            const uploadedDocuments = await this.processRootLevelFiles(files);
            if (body.shareholders.length > 0) {
                body.shareholders = await Promise.all(body.shareholders.map(async (shareholder, index) => await this.processPersonDocuments(shareholder, index, "shareholders", files)));
            }
            if (body.directors.length > 0) {
                body.directors = await Promise.all(body.directors.map(async (director, index) => await this.processPersonDocuments(director, index, "directors", files)));
            }
            await this.trainerModel.updateOne({ caseId }, {
                ...body,
                ...uploadedDocuments,
                status: interface_1.kycStatus.underReview,
            });
        }
        catch (error) {
            console.error("Processing failed:", error);
        }
    }
    async findOne(query) {
        try {
            const { options, filter } = this.findOneFilter(query);
            const response = await (0, helpers_1.findOneWrapper)(this.trainerModel.findOne(filter), options, "Kyc Training Portal");
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async findMany(query) {
        try {
            const data = await (0, helpers_1.findManyWrapper)(this.trainerModel, this.findManyFilter(query), query);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async update(data, id) {
        try {
            const findCase = await this.trainerModel.findById(id);
            if (!findCase) {
                throw new routing_controllers_1.NotFoundError("No case found with this ID");
            }
            return this.trainerModel
                .findByIdAndUpdate(id, { ...data }, { new: true })
                .exec();
        }
        catch (error) {
            throw error;
        }
    }
    async caseStats() {
        try {
            const [totalCases, underReview, completed, avgScore] = await Promise.all([
                this.trainerModel.countDocuments(),
                this.trainerModel.countDocuments({ status: interface_1.kycStatus.underReview }),
                this.trainerModel.countDocuments({ status: interface_1.kycStatus.completed }),
                this.trainerModel.aggregate([
                    { $match: { score: { $ne: null } } },
                    { $group: { _id: null, avgScore: { $avg: "$score" } } },
                ]),
            ]);
            const averageScore = avgScore.length > 0 ? avgScore[0].avgScore : 0;
            return {
                totalCases,
                underReview,
                completed,
                averageScore,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async dashboardStats() {
        try {
            const [totalCases, underReview, completed, highRisk] = await Promise.all([
                this.trainerModel.countDocuments(),
                this.trainerModel.countDocuments({ status: interface_1.kycStatus.underReview }),
                this.trainerModel.countDocuments({ status: interface_1.kycStatus.completed }),
                this.trainerModel.countDocuments({ riskLevel: interface_1.riskLevel.high }),
            ]);
            return { totalCases, underReview, totalCompleted: completed, highRisk };
        }
        catch (error) {
            throw error;
        }
    }
    findManyFilter(query) {
        const filter = {};
        if (query.search) {
            filter.$or = [];
            query.search.forEach((searchTerm) => {
                if (mongoose_1.Types.ObjectId.isValid(searchTerm)) {
                    filter.$or.push({ _id: new mongoose_1.Types.ObjectId(searchTerm) });
                }
                else {
                    const regx = new RegExp(searchTerm, "i");
                    filter.$or.push({ ["entityName.value"]: regx, caseId: regx });
                }
            });
        }
        if (query.accountNumber) {
            filter["accountNumber.value"] = { $in: query.accountNumber };
        }
        if (query.caseId) {
            filter["caseId.value"] = { $in: query.caseId };
        }
        if (query.companyNumber) {
            filter["companyNumber.value"] = { $in: query.companyNumber };
        }
        if (query.entityName) {
            filter["entityName.value"] = { $in: query.entityName };
        }
        if (query.productType) {
            filter["productType.value"] = { $in: query.productType };
        }
        return filter;
    }
    findOneFilter(query) {
        const { lean, session, increaseView, populate, select, ...filter } = query;
        const options = {
            lean: true,
            session,
            select,
            populate,
        };
        return { options, filter };
    }
    joinName(name) {
        return name.replace(/\s+/g, "-").toLowerCase();
    }
    async createDocument(file) {
        return {
            name: this.joinName(file.originalname),
            type: file.mimetype,
            uploadedDate: new Date(),
            uri: await this.uploadService.upload(file),
        };
    }
    async processRootLevelFiles(files) {
        const result = this.expectedFiles.reduce((acc, key) => {
            acc[key] = [];
            return acc;
        }, {});
        const relevantFiles = files.filter((file) => this.expectedFiles.includes(file.fieldname));
        for (let i = 0; i < relevantFiles.length; i += this.UPLOAD_CONCURRENCY) {
            const batch = relevantFiles.slice(i, i + this.UPLOAD_CONCURRENCY);
            const batchPromises = batch.map(async (file) => {
                try {
                    const key = file.fieldname;
                    const document = await this.createDocument(file);
                    return { key, document };
                }
                catch (error) {
                    console.error(`Failed to upload file: ${file.originalname}`, error);
                    return null;
                }
            });
            const batchResults = await Promise.all(batchPromises);
            batchResults.forEach((batchResult) => {
                if (batchResult) {
                    result[batchResult.key].push(batchResult.document);
                }
            });
            if (i + this.UPLOAD_CONCURRENCY < relevantFiles.length) {
                await new Promise((resolve) => setTimeout(resolve, this.BATCH_DELAY_MS));
            }
        }
        return result;
    }
    async processPersonDocuments(person, index, role, files) {
        const processedPerson = { ...person };
        if (role === "shareholders") {
            processedPerson.uploadIdDocument = await this.findAndCreateDocument(files, `shareholders[${index}][uploadIdDocument]`, person.uploadIdDocument);
            processedPerson.uploadProofOfAddress = await this.findAndCreateDocument(files, `shareholders[${index}][uploadProofOfAddress]`, person.uploadProofOfAddress);
        }
        const categories = [
            "politicallyExposedPerson",
            "sanctionsScreening",
            "adverseNews",
        ];
        for (const category of categories) {
            if (processedPerson[category]) {
                processedPerson[category] = await this.processDocumentCategory(processedPerson[category], index, role, category, files);
            }
        }
        return processedPerson;
    }
    async processDocumentCategory(category, index, role, categoryName, files) {
        const documentTypes = [
            "bankStatementsDocuments",
            "sourceOfWealthEvidenceDocuments",
            "additionalSupportingDocuments",
        ];
        const processedCategory = { ...category };
        for (const docType of documentTypes) {
            const fieldname = `${role}[${index}][${categoryName}][${docType}]`;
            const matchingFiles = files.filter((f) => f.fieldname === fieldname);
            if (matchingFiles.length > 0) {
                const documents = [];
                for (const file of matchingFiles) {
                    try {
                        const document = await this.createDocument(file);
                        documents.push(document);
                    }
                    catch (error) {
                        console.error(`Failed to upload ${docType} file:`, error);
                    }
                }
                processedCategory[docType] = [
                    ...(category[docType] || []),
                    ...documents,
                ];
            }
        }
        return processedCategory;
    }
    async findAndCreateDocument(files, fieldname, existingDoc) {
        const file = files.find((f) => f.fieldname === fieldname);
        if (file) {
            return this.createDocument(file);
        }
        return existingDoc;
    }
    async generateCaseId() {
        const count = await this.trainerModel.countDocuments();
        return String(count + 1).padStart(3, "0");
    }
};
exports.KycTrainingPortalService = KycTrainingPortalService;
exports.KycTrainingPortalService = KycTrainingPortalService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("trainerModel")),
    __metadata("design:paramtypes", [Object, services_1.UploadService])
], KycTrainingPortalService);
//# sourceMappingURL=kyc.service.js.map