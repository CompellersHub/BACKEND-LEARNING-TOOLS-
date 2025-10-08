import { findManyWrapper, findOneWrapper } from "@/global/helpers";
import { agenda, Jobs, UploadService } from "@/global/services";
import { Request } from "express";
import { FilterQuery, PaginateResult, Types } from "mongoose";
import { BadRequestError, NotFoundError } from "routing-controllers";
import { Inject, Service } from "typedi";
import {
  caseStatsResponse,
  create,
  dashboardStatsResponse,
  FileProcessingResult,
  findManyKycTrainingPortal,
  findOneKycTrainingPortal,
  kycDocumentType,
  kycStatus,
  KycTrainingPortal,
  riskLevel,
  update,
} from "./interface";
import { TrainerModel, TrainingDocument } from "./model";
import { uploadFile } from "@/global/entities";
// import { PromisePool } from "@supercharge/promise-pool";
// import { uploadFile } from "@/global/entities";

@Service()
export class KycTrainingPortalService {
  private readonly UPLOAD_CONCURRENCY = 3;
  private readonly BATCH_DELAY_MS = 50;
  constructor(
    @Inject("trainerModel") private trainerModel: typeof TrainerModel,
    private readonly uploadService: UploadService
  ) {}

  async create(body: create, request: Request): Promise<KycTrainingPortal> {
    try {
      const files = Array.isArray(request.files) ? request.files : [];

      const caseId = await this.generateCaseId();
      const starting = new Date(new Date().getTime() + 5 * 60 * 1000);

      const response = await this.trainerModel.create({
        caseId,
        ...body,
        status: kycStatus.queued,
        submittedDate: Date.now(),
      });

      void agenda.schedule(starting, Jobs.kyc, {
        body,
        files: files.map((file) => ({
          originalname: file.originalname,
          mimetype: file.mimetype,
          buffer: file.buffer.toString("base64"), // Convert buffer to base64
          fieldname: file.fieldname,
          size: file.size,
        })),
        caseId,
        when: "5 minutes after",
      });
      return response;
    } catch (error) {
      if (error instanceof mongoose.conn.Error.CastError) {
        console.log({ error });
        throw new BadRequestError(error.message);
      }
      throw error;
    }
  }

  async kycScheduleCreate(body: create, files: uploadFile[], caseId: string) {
    try {
      // Process root level files
      const uploadedDocuments = await this.processRootLevelFiles(files);

      // Process shareholders
      if (body.shareholders.length > 0) {
        body.shareholders = await Promise.all(
          body.shareholders.map(
            async (shareholder, index) =>
              await this.processPersonDocuments(
                shareholder,
                index,
                "shareholders",
                files
              )
          )
        );
      }

      // Process directors
      if (body.directors.length > 0) {
        body.directors = await Promise.all(
          body.directors.map(
            async (director, index) =>
              await this.processPersonDocuments(
                director,
                index,
                "directors",
                files
              )
          )
        );
      }

      await this.trainerModel.updateOne(
        { caseId },
        {
          ...body,
          ...uploadedDocuments,
          status: kycStatus.underReview,
        }
      );
    } catch (error) {
      console.error("Processing failed:", error);
    }
  }

  async findOne(
    query: FilterQuery<TrainingDocument>
  ): Promise<KycTrainingPortal> {
    try {
      const { options, filter } = this.findOneFilter(query);
      const response = await findOneWrapper(
        this.trainerModel.findOne(filter),
        options,
        "Kyc Training Portal"
      );

      // if (Array.isArray(response.documents)) {
      //   response.documents = await Promise.all(
      //     response.documents.map(async (item) => ({
      //       ...item,
      //       uri: await decrypted(item.uri),
      //     }))
      //   );
      // }

      return response;
    } catch (error) {
      throw error;
    }
  }

  async findMany(
    query: findManyKycTrainingPortal
  ): Promise<PaginateResult<KycTrainingPortal>> {
    try {
      const data = await findManyWrapper<KycTrainingPortal>(
        this.trainerModel,
        this.findManyFilter(query),
        query
      );

      // const docs: KycTrainingPortal[] = await Promise.all(
      //   data.docs.map(async (response) => {
      //     if (Array.isArray(response.documents)) {
      //       response.documents = await Promise.all(
      //         response.documents.map(async (item) => ({
      //           ...item,
      //           uri: await decrypted(item.uri),
      //         }))
      //       );
      //     }
      //     return response;
      //   })
      // );
      // return { ...data, docs };
      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(data: update, id: string): Promise<KycTrainingPortal> {
    try {
      const findCase = await this.trainerModel.findById(id);
      if (!findCase) {
        throw new NotFoundError("No case found with this ID");
      }

      // if (data.documents) {
      //   data.documents = await Promise.all(
      //     data.documents.map(async (item) => ({
      //       ...item,
      //       uri: await encryption(item.uri),
      //     }))
      //   );
      // }

      // TODO send email to the student once the case is update and score is updated
      return this.trainerModel
        .findByIdAndUpdate(id, { ...data }, { new: true })
        .exec();
    } catch (error) {
      throw error;
    }
  }

  async caseStats(): Promise<caseStatsResponse> {
    try {
      const [totalCases, underReview, completed, avgScore] = await Promise.all([
        this.trainerModel.countDocuments(),
        this.trainerModel.countDocuments({ status: kycStatus.underReview }),
        this.trainerModel.countDocuments({ status: kycStatus.completed }),
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
    } catch (error) {
      throw error;
    }
  }

  async dashboardStats(): Promise<dashboardStatsResponse> {
    try {
      const [totalCases, underReview, completed, highRisk] = await Promise.all([
        this.trainerModel.countDocuments(),
        this.trainerModel.countDocuments({ status: kycStatus.underReview }),
        this.trainerModel.countDocuments({ status: kycStatus.completed }),
        this.trainerModel.countDocuments({ riskLevel: riskLevel.high }),
      ]);

      return { totalCases, underReview, totalCompleted: completed, highRisk };
    } catch (error) {
      throw error;
    }
  }

  private findManyFilter(
    query: findManyKycTrainingPortal
  ): FilterQuery<TrainingDocument> {
    const filter: FilterQuery<KycTrainingPortal> = {};

    if (query.search) {
      filter.$or = [];
      query.search.forEach((searchTerm) => {
        if (Types.ObjectId.isValid(searchTerm)) {
          filter.$or.push({ _id: new Types.ObjectId(searchTerm) });
        } else {
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

  private findOneFilter(query: findOneKycTrainingPortal) {
    const { lean, session, increaseView, populate, select, ...filter } = query;
    const options = {
      lean: true,
      session,
      select,
      populate,
    };

    return { options, filter };
  }

  private joinName(name: string): string {
    return name.replace(/\s+/g, "-").toLowerCase();
  }

  private readonly expectedFiles = [
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

  private async createDocument(
    file: Express.Multer.File
  ): Promise<kycDocumentType> {
    return {
      name: this.joinName(file.originalname),
      type: file.mimetype,
      uploadedDate: new Date(),
      uri: await this.uploadService.upload(file),
    };
  }

  private async processRootLevelFiles(
    files: Express.Multer.File[]
  ): Promise<FileProcessingResult> {
    const result = this.expectedFiles.reduce((acc, key) => {
      acc[key as keyof FileProcessingResult] = [];
      return acc;
    }, {} as FileProcessingResult);

    const relevantFiles = files.filter((file) =>
      this.expectedFiles.includes(file.fieldname)
    );

    // Process files with controlled concurrency
    for (let i = 0; i < relevantFiles.length; i += this.UPLOAD_CONCURRENCY) {
      const batch = relevantFiles.slice(i, i + this.UPLOAD_CONCURRENCY);

      const batchPromises = batch.map(async (file) => {
        try {
          const key = file.fieldname as keyof FileProcessingResult;
          const document = await this.createDocument(file);
          return { key, document };
        } catch (error) {
          console.error(`Failed to upload file: ${file.originalname}`, error);
          return null;
        }
      });

      const batchResults = await Promise.all(batchPromises);

      // FIX: Use the main result object, not the batch result
      batchResults.forEach((batchResult) => {
        if (batchResult) {
          // Access the main result object using the key from batchResult
          result[batchResult.key].push(batchResult.document);
        }
      });

      // Delay between batches to avoid overwhelming S3
      if (i + this.UPLOAD_CONCURRENCY < relevantFiles.length) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.BATCH_DELAY_MS)
        );
      }
    }

    return result;
  }

  private async processPersonDocuments(
    person: any,
    index: number,
    role: "shareholders" | "directors",
    files: Express.Multer.File[]
  ) {
    const processedPerson = { ...person };

    if (role === "shareholders") {
      processedPerson.uploadIdDocument = await this.findAndCreateDocument(
        files,
        `shareholders[${index}][uploadIdDocument]`,
        person.uploadIdDocument
      );

      processedPerson.uploadProofOfAddress = await this.findAndCreateDocument(
        files,
        `shareholders[${index}][uploadProofOfAddress]`,
        person.uploadProofOfAddress
      );
    }

    const categories = [
      "politicallyExposedPerson",
      "sanctionsScreening",
      "adverseNews",
    ];

    // Process categories sequentially, not in parallel
    for (const category of categories) {
      if (processedPerson[category]) {
        processedPerson[category] = await this.processDocumentCategory(
          processedPerson[category],
          index,
          role,
          category,
          files
        );
      }
    }

    return processedPerson;
  }

  private async processDocumentCategory(
    category: any,
    index: number,
    role: string,
    categoryName: string,
    files: Express.Multer.File[]
  ) {
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
        // Process files sequentially within each document type
        const documents = [];
        for (const file of matchingFiles) {
          try {
            const document = await this.createDocument(file);
            documents.push(document);
          } catch (error) {
            console.error(`Failed to upload ${docType} file:`, error);
            // Continue with other files even if one fails
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

  private async findAndCreateDocument(
    files: Express.Multer.File[],
    fieldname: string,
    existingDoc: any
  ) {
    const file = files.find((f) => f.fieldname === fieldname);
    if (file) {
      return this.createDocument(file);
    }
    return existingDoc;
  }

  private async generateCaseId(): Promise<string> {
    const count = await this.trainerModel.countDocuments();
    return String(count + 1).padStart(3, "0");
  }
}
