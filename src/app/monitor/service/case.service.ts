import { UploadService } from "@/global/services";
import { Request } from "express";
import { FilterQuery, MongooseError, PaginateResult } from "mongoose";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { Inject, Service } from "typedi";
import {
  addOrRemoveEvidence,
  caseMonitoring,
  Documents,
  escalate,
  evidenceCollect,
  financialCrime,
  findManyCase,
  findOneCase,
  investigate,
  pepEnhancedDueDiligence,
  sanctionReview,
  selectedDecision,
  updateCase,
} from "../interface";
import {
  AlertDocument,
  AlertModel,
  EscalateDocument,
  EscalateModel,
  FinancialModel,
  InvestigateModel,
  PEPModel,
  SanctionModel,
} from "../model";
import { MonitorService } from "./monitor.service";
import { CaseDocument, CaseModel } from "../model/case.model";
import { Types } from "mongoose";
import { findManyWrapper, findOneWrapper } from "@/global/helpers";

@Service()
export class CaseMonitoringService {
  constructor(
    @Inject("escalateModel")
    private readonly escalateModel: typeof EscalateModel,
    @Inject("financialModel")
    private readonly financialModel: typeof FinancialModel,
    @Inject("investigateModel")
    private readonly investigateModel: typeof InvestigateModel,
    @Inject("pEPModel") private readonly pepModel: typeof PEPModel,
    @Inject("sanctionModel")
    private readonly sanctionModel: typeof SanctionModel,
    @Inject("alertModel") private readonly alert: typeof AlertModel,
    @Inject("caseModel") private readonly caseMonitor: typeof CaseModel,
    private readonly uploadService: UploadService,
    private readonly monitorService: MonitorService
  ) {}

  async createEscalate(dto: escalate): Promise<EscalateDocument> {
    try {
      const findAlert = await this.alert.findById(dto.alertId);
      if (!findAlert) throw new NotFoundError("Alert not found");

      void this.createCase(
        findAlert,
        dto.escalationNotes,
        selectedDecision.approve
      );

      return this.escalateModel.create(dto);
    } catch (error) {
      if (error instanceof MongooseError || error instanceof Error) {
        throw new BadRequestError(error.message);
      }
      throw error;
    }
  }

  async createFinancial(dto: financialCrime, request: Request) {
    try {
      const findAlert = await this.alert.findById(dto.alertId);
      if (!findAlert) throw new NotFoundError("Alert not found");

      void this.createCase(
        findAlert,
        dto.finalDecisionRationale,
        dto.finalCaseDecision
      );

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
    } catch (error) {
      if (error instanceof MongooseError || error instanceof Error) {
        throw new BadRequestError(error.message);
      }
      throw error;
    }
  }

  async createInvestigation(dto: investigate, request: Request) {
    try {
      const findAlert = await this.alert.findById(dto.alertId);
      if (!findAlert) throw new NotFoundError("Alert not found");

      void this.createCase(
        findAlert,
        dto.investigationNote,
        dto.investigationDecision,
        dto.assignTo
      );

      // uploading of files and adding it to the array of evidence
      if (dto.evidence.length) {
        dto.evidence = await Promise.all(
          dto.evidence.map(async (item, idx) => {
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
          })
        );
      }

      return this.investigateModel.create(dto);
    } catch (error) {
      if (error instanceof MongooseError || error instanceof Error) {
        throw new BadRequestError(error.message);
      }
      throw error;
    }
  }

  async createPep(dto: pepEnhancedDueDiligence, request: Request) {
    try {
      const findAlert = await this.alert.findById(dto.alertId);
      if (!findAlert) throw new NotFoundError("Alert not found");

      void this.createCase(
        findAlert,
        dto.finalDecisionRationale,
        dto.finalCaseDecision
      );

      // collect files as documents
      if (Array.isArray(request.files) && request.files.length > 0) {
        const documents: Documents[] = await Promise.all(
          request.files.map(async (file) => ({
            type: file.mimetype,
            size: file.size,
            name: this.joinName(file.originalname),
            link: await this.uploadService.upload(file),
          }))
        );
        dto.documentUploadAndSupportingEvidence = documents;
      }

      return this.pepModel.create(dto);
    } catch (error) {
      if (error instanceof MongooseError || error instanceof Error) {
        throw new BadRequestError(error.message);
      }
      throw error;
    }
  }

  async createSanction(dto: sanctionReview, request: Request) {
    try {
      const findAlert = await this.alert.findById(dto.alertId);
      if (!findAlert) throw new NotFoundError("Alert not found");

      void this.createCase(
        findAlert,
        dto.finalDecisionRationale,
        dto.finalCaseDecision
      );

      // collect files as documents
      if (Array.isArray(request.files) && request.files.length > 0) {
        const documents: Documents[] = await Promise.all(
          request.files.map(async (file) => ({
            type: file.mimetype,
            size: file.size,
            name: this.joinName(file.originalname),
            link: await this.uploadService.upload(file),
          }))
        );

        dto.identifyDocuments = documents;
      }

      return this.sanctionModel.create(dto);
    } catch (error) {
      if (error instanceof MongooseError || error instanceof Error) {
        throw new BadRequestError(error.message);
      }
      throw error;
    }
  }

  async updateCase(dto: updateCase, id: string): Promise<caseMonitoring> {
    try {
      const findCase = await this.caseMonitor.findById(id);
      if (!findCase) throw new NotFoundError("Case not found");
      return this.caseMonitor
        .findByIdAndUpdate(id, { ...dto }, { new: true })
        .exec();
    } catch (error) {
      if (error instanceof MongooseError || error instanceof Error) {
        throw new BadRequestError(error.message);
      }
      throw error;
    }
  }

  async addOrRemoveEvidence(dto: addOrRemoveEvidence) {
    try {
      const findCase = await this.caseMonitor.findById(dto.id);
      if (!findCase) throw new NotFoundError("Case not found");

      const { riskLevel, status, transactionRecord, type } = dto;

      if (type === "add") {
        // Push evidence to the items array
        await this.caseMonitor.updateOne(
          { _id: dto.id },
          {
            $push: {
              evidenceCollecting: { riskLevel, status, transactionRecord },
            },
          }
        );
        return { message: "Item added successful" };
      } else if (type === "delete") {
        // Pull evidence from the items array
        await this.caseMonitor.updateOne(
          { _id: dto.id },
          {
            $pull: {
              evidenceCollecting: { riskLevel, status, transactionRecord },
            },
          }
        );
        return { message: "Item remove successful" };
      } else {
        throw new BadRequestError("Invalid operation type");
      }
    } catch (error) {
      if (error instanceof MongooseError || error instanceof Error) {
        throw new BadRequestError(error.message);
      }
      throw error;
    }
  }

  async findManyCases(
    query: findManyCase
  ): Promise<PaginateResult<caseMonitoring>> {
    try {
      return findManyWrapper<caseMonitoring>(
        this.caseMonitor,
        this.filterManyCase(query),
        query
      );
    } catch (error) {
      throw error;
    }
  }

  async findOneCase(
    query: FilterQuery<caseMonitoring>
  ): Promise<caseMonitoring> {
    try {
      const { options, filter } = this.filterOneCase(query);
      return findOneWrapper(
        this.caseMonitor.findOne(filter),
        options,
        "Case Model"
      );
    } catch (error) {
      throw error;
    }
  }

  private async createCase(
    data: AlertDocument,
    decisionRationale: string,
    caseDecision: string,
    assignTo = ""
  ) {
    const result = await this.monitorService.findOneProfile({
      _id: data.userId,
    });

    if (!result) return;

    const details: caseMonitoring = {
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

  private filterOneCase(query: findOneCase) {
    const { lean, session, increaseView, populate, select, ...filter } = query;
    const options = {
      lean: true,
      session,
      select,
      populate,
    };

    return { options, filter };
  }

  private filterManyCase = (query: findManyCase): FilterQuery<CaseDocument> => {
    const filter: FilterQuery<caseMonitoring> = {};

    if (query.search) {
      filter.$or = [];
      query.search.forEach((searchTerm) => {
        if (Types.ObjectId.isValid(searchTerm)) {
          filter.$or.push({ _id: new Types.ObjectId(searchTerm) });
        } else {
          const regx = new RegExp(searchTerm, "i");
          filter.$or.push(
            { question: regx },
            { explanation: regx },
            { type: regx }
          );
        }
      });
    }

    if (query.caseId) filter["caseId"] = { $in: query.caseId };
    if (query.status) filter["status"] = { $in: query.status };
    if (query.priority) filter["priority"] = { $in: query.priority };

    return filter;
  };

  private riskLevel(score: number): string {
    if (score <= 30) return "Low";
    if (score <= 65) return "Medium";
    return "High";
  }

  private joinName(name: string): string {
    return name.replace(/\s+/g, "-").toLowerCase();
  }
}
