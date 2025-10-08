import { resStatusCode } from "@/global/constant";
import { Logger } from "@/global/helpers";

import {
  Body,
  Controller,
  Get,
  InternalServerError,
  Param,
  Patch,
  Post,
  QueryParams,
  Req,
  UnprocessableEntityError,
  UseBefore,
} from "routing-controllers";

import { Request } from "express";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from "typedi";
import {
  CreateKYC,
  FindManyKycTraining,
  FindOneKycTraining,
  UpdateKYC,
} from "./dto";
import { KycTrainingPortalService } from "./kyc.service";
import { loadAny } from "./upload";

const logger = new Logger("KYC Training Portal");

@Controller("/", { transformResponse: false })
@OpenAPI({
  tags: ["KYC TRAINERS"],
})
@Service()
export class KycController {
  constructor(private kycService: KycTrainingPortalService) {}

  @Post("kyc-trainer")
  // @Authorized(["admin"])
  @UseBefore(loadAny)
  public async create(@Body() body: CreateKYC, @Req() request: Request) {
    return this.kycService.create(body, request);
  }

  @Get("kyc-trainers")
  async findMany(
    @QueryParams({ type: FindManyKycTraining })
    query: FindManyKycTraining
  ) {
    try {
      const kycTrainingPortals = await this.kycService.findMany(query);
      return {
        success: true,
        status: resStatusCode.OK,
        data: kycTrainingPortals,
      };
    } catch (error: any) {
      const message = error.message || "internal server error";
      logger.error(message, error);
      throw new InternalServerError(message);
    }
  }

  @Get("kyc-trainer")
  async findOne(
    @QueryParams({
      type: FindOneKycTraining,
    })
    query: FindOneKycTraining
  ) {
    try {
      const kycTrainingPortal = await this.kycService.findOne(query);
      return {
        success: true,
        status: resStatusCode.OK,
        data: kycTrainingPortal,
      };
    } catch (error: any) {
      const message = error.message || "internal server error";
      logger.error(message, error);
      throw new InternalServerError(message);
    }
  }

  @Patch("kyc-trainer/:id")
  async update(@Param("id") param: string, @Body() body: UpdateKYC) {
    try {
      if (!param) {
        throw new UnprocessableEntityError("ID is required");
      }

      const updatedKyc = await this.kycService.update(body, param);
      return {
        success: true,
        status: resStatusCode.OK,
        data: updatedKyc,
      };
    } catch (error: any) {
      const message = error.message || "internal server error";
      logger.error(message, error);
      throw new InternalServerError(message);
    }
  }

  @Get("kyc-trainer/case-stats")
  async caseStats() {
    try {
      const stats = await this.kycService.caseStats();
      return {
        success: true,
        status: resStatusCode.OK,
        data: stats,
      };
    } catch (error: any) {
      const message = error.message || "internal server error";
      logger.error(message, error);
      throw new InternalServerError(message);
    }
  }

  @Get("kyc-trainer/dashboard-stats")
  async dashboardStats() {
    try {
      const stats = await this.kycService.dashboardStats();
      return {
        success: true,
        status: resStatusCode.OK,
        data: stats,
      };
    } catch (error: any) {
      const message = error.message || "internal server error";
      logger.error(message, error);
      throw new InternalServerError(message);
    }
  }
}
