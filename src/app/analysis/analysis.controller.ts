import {
  Body,
  Controller,
  Get,
  Post,
  QueryParams,
  UploadedFile,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from "typedi";
import { AnalysisToolServices } from "./analysis.service";
import { Logger } from "@/global/helpers";
import { uploadFile } from "@/global/entities";
import { CreateMeasure, searchData } from "./dto";

const logger = new Logger("Analysis Tools");

@Controller("/", { transformResponse: false })
@OpenAPI({
  tags: ["Analysis Tools"],
})
@Service()
export class AnalysisToolsController {
  constructor(private toolServices: AnalysisToolServices) {}

  @Post("connect-file")
  @OpenAPI({
    description: "Upload a file to analysis",
  })
  async uploadfile(
    @UploadedFile("file", {
      required: true,
    })
    file: uploadFile
  ) {
    try {
      return this.toolServices.uploadFile(file);
    } catch (error) {
      throw error;
    }
  }

  @Get("file-connected")
  async findMany() {
    try {
      return this.toolServices.findAll({ id: "12345" });
    } catch (error) {
      throw error;
    }
  }

  @Get("search-column")
  async SearchColumn(@QueryParams() param: searchData) {
    try {
      return this.toolServices.searchColumn(param);
    } catch (error) {
      throw error;
    }
  }

  @Post("dax-engine")
  async createMeasure(@Body() body: CreateMeasure) {
    return this.toolServices.createMeasure(body);
  }
}
