import { resStatusCode } from "@/global/constant";
import { uploadFile } from "@/global/entities";
import { Logger } from "@/global/helpers";
import {
  BadRequestError,
  Body,
  Controller,
  Get,
  InternalServerError,
  Post,
  UnprocessableEntityError,
  UploadedFile,
} from "routing-controllers";
import { Service } from "typedi";
import { CreateReview, SearchOnline } from "./dto";
import { ReviewService, SmartSearchService } from "./service";

const logger = new Logger("Smart Search");

@Service()
@Controller("/", { transformResponse: false })
export class SmartSearchController {
  constructor(
    private readonly smartService: SmartSearchService,
    private readonly reviewService: ReviewService
  ) {}

  @Post("smart-search")
  async SmartSearch(@Body() body: SearchOnline) {
    try {
      const quick = await this.smartService.create(body);
      return { success: true, status: resStatusCode.OK, data: quick };
    } catch (error: unknown) {
      this.errorLog(error);
    }
  }

  @Post("batch-screening")
  async BatchScreening(@UploadedFile("document") document: uploadFile) {
    try {
      this.validateDocument(document);
      const batch = await this.smartService.batchScreening(document);
      return { success: true, status: resStatusCode.OK, data: batch };
    } catch (error: unknown) {
      this.errorLog(error);
    }
  }

  @Get("recent-alerts")
  async RecentAlerts() {
    try {
      const batch = await this.smartService.findAll({ limit: 4 });
      return { success: true, status: resStatusCode.OK, data: batch };
    } catch (error: unknown) {
      this.errorLog(error);
    }
  }

  @Get("risk-distribution")
  async riskDistribution() {
    try {
      const recent = await this.smartService.riskDistribution();
      return { success: true, status: resStatusCode.OK, data: recent };
    } catch (error: unknown) {
      this.errorLog(error);
    }
  }

  @Get("monthly-screening")
  async monthlyScreeningActivity() {
    try {
      const monthly = await this.smartService.monthlyScreeningActivity();
      return { success: true, status: resStatusCode.OK, data: monthly };
    } catch (error: unknown) {
      this.errorLog(error);
    }
  }

  @Get("reports-stats")
  async yearlyReport() {
    try {
      const yearly = await this.smartService.reportStats();
      return { success: true, status: resStatusCode.OK, data: yearly };
    } catch (error: unknown) {
      this.errorLog(error);
    }
  }

  @Get("alert-analysis")
  async positiveAndNegative() {
    try {
      const alertCount =
        await this.reviewService.positiveTrueAndNegativeFalseBarChart();
      return { success: true, status: resStatusCode.OK, data: alertCount };
    } catch (error) {
      this.errorLog(error);
    }
  }

  @Post("submit-alert")
  async massReviewActions(@Body() body: CreateReview) {
    try {
      const review = await this.reviewService.create(body);
      return { success: true, status: resStatusCode.CREATED, data: review };
    } catch (error) {
      this.errorLog(error);
    }
  }

  @Get("screening-volume")
  async lastYearMonthlyScreeningActivity() {
    try {
      const data = await this.smartService.lastMonthlyScreeningActivity();
      return { success: true, status: resStatusCode.OK, data };
    } catch (error) {
      this.errorLog(error);
    }
  }

  private validateDocument(document: uploadFile): void {
    if (!document) {
      throw new UnprocessableEntityError("No files uploaded");
    }

    if (!document.buffer || document.size === 0) {
      throw new UnprocessableEntityError(`Document is empty`);
    }
    const validMimeTypes = ["text/csv"];
    if (!validMimeTypes.includes(document.mimetype)) {
      throw new UnprocessableEntityError(
        `Document has invalid file type. Only CSV are allowed`
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (document.size > maxSize) {
      throw new UnprocessableEntityError(
        `Document exceeds maximum size of 5MB`
      );
    }
  }

  private errorLog(error: unknown): void {
    if (error instanceof Error) {
      const message = error.message || "internal server error";
      logger.error(message, error);
      throw new BadRequestError(message);
    }
    throw new InternalServerError("Internal server error");
  }
}
