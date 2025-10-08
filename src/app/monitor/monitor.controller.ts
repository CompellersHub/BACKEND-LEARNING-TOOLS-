import { resStatusCode } from "@/global/constant";
import { Request } from "express";
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  QueryParams,
  Req,
  UseBefore,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from "typedi";
import { loadAny } from "../kyc-training-portal/upload";
import { CreateAlert, FindManyAlert, FindOneProfile } from "./dto";
import {
  AddOrRemoveEvidence,
  CreateInvestigation,
  Escalate,
  FinancialCrime,
  FindManyCase,
  FindOneCase,
  PepEnhancedDueDiligence,
  SanctionReview,
  UpdateCase,
} from "./dto/case.dto";
import { CaseMonitoringService } from "./service/case.service";
import { MonitorService } from "./service/monitor.service";

@Service()
@Controller("/", { transformResponse: false })
@OpenAPI({
  tags: ["Transaction Monitor"],
})
export class MonitorController {
  constructor(
    private readonly monitor: MonitorService,
    private readonly caseService: CaseMonitoringService
  ) {}

  @Post("submit-review")
  async submitReviewAlert(@Body() body: CreateAlert) {
    try {
      const data = await this.monitor.submitReviewAlert(body);
      return { success: true, data, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }

  @Get("alerts")
  async findManyAlert(@QueryParams() query: FindManyAlert) {
    try {
      const alert = await this.monitor.findManyAlerts(query);
      return { success: true, data: alert, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }

  @Get("monitoring-users")
  async findMonitoringUsers(@QueryParams() query: FindOneProfile) {
    try {
      const profile = await this.monitor.findOneProfile(query);
      return { success: true, data: profile, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }

  @Get("analytics-dashboard")
  async AnalysisDashboard() {
    try {
      const analysis = await this.monitor.analyticsDashboard();
      return { success: true, data: analysis, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }

  @Get("topbar-stats")
  async TopBarStats() {
    try {
      const stats = await this.monitor.topbarAnalytics();
      return { success: true, data: stats, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }

  // @Get("/transactions")
  // async Transaction(@QueryParams() query: FindManyTransaction) {
  //   try {
  //     const transaction = this.monitor.findManyTransactions(query);
  //     return { success: true, data: transaction, status: resStatusCode.OK };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  @Get("alert-count")
  async AlertCount() {
    try {
      const alert = await this.monitor.alertCount();
      return { success: true, data: alert, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }

  @Post("create-escalate")
  createEscalate(@Body() body: Escalate) {
    return this.caseService.createEscalate(body);
  }

  @Post("create-investigate")
  @UseBefore(loadAny)
  createInvestigation(@Body() body: CreateInvestigation, @Req() req: Request) {
    return this.caseService.createInvestigation(body, req);
  }

  @Post("create-financial")
  @UseBefore(loadAny)
  createFinancial(@Body() body: FinancialCrime, @Req() req: Request) {
    return this.caseService.createFinancial(body, req);
  }

  @Post("create-pep")
  @UseBefore(loadAny)
  createPep(@Body() body: PepEnhancedDueDiligence, @Req() req: Request) {
    return this.caseService.createPep(body, req);
  }

  @Post("create-sanction")
  @UseBefore(loadAny)
  createSanction(@Body() body: SanctionReview, @Req() req: Request) {
    return this.caseService.createSanction(body, req);
  }

  @Patch("update-case/:caseId")
  updateCase(@Body() body: UpdateCase, @Param("caseId") id: string) {
    return this.caseService.updateCase(body, id);
  }

  @Get("case-monitorings")
  findManyCase(@QueryParams() query: FindManyCase) {
    return this.caseService.findManyCases(query);
  }

  @Get("case-monitoring")
  findOneCase(@QueryParams() query: FindOneCase) {
    return this.caseService.findOneCase(query);
  }

  @Post("add-or-remove-evidence")
  addOrRemoveEvidence(@Body() body: AddOrRemoveEvidence) {
    return this.caseService.addOrRemoveEvidence(body);
  }
}
