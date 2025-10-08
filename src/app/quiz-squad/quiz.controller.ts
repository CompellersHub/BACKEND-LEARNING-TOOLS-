import { resStatusCode } from "@/global/constant";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  QueryParams,
  UnprocessableEntityError,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from "typedi";
import {
  CreateQuestion,
  FindManyEnrollment,
  FindManyQuestion,
  FindOneQuestion,
  RecordScore,
  UpdateQuestion,
} from "./dto";
import { EnrollService, QuizService } from "./services";

@Service()
@OpenAPI({
  tags: ["QUIZ"],
})
@Controller("", { transformResponse: false })
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly enrollService: EnrollService
  ) {}

  @Post("/quiz")
  async CreateNewQuestions(@Body() body: CreateQuestion) {
    try {
      const data = await this.quizService.createQuestion(body);
      return { data, success: true, status: resStatusCode.CREATED };
    } catch (error) {
      throw error;
    }
  }

  @Get("/quizzes")
  async FindManyQuiz(@QueryParams() query: FindManyQuestion) {
    try {
      const data = await this.quizService.findManyQuestion(query);
      return { data, status: resStatusCode.OK, success: true };
    } catch (error) {
      throw error;
    }
  }

  @Get("/quiz")
  async FindOneQuestion(@QueryParams() query: FindOneQuestion) {
    try {
      const data = await this.quizService.findOneQuestion(query);
      return { data, status: resStatusCode.OK, success: true };
    } catch (error) {
      throw error;
    }
  }

  @Patch("/quiz/:id")
  async UpdateOneQuestion(
    @Param("id") param: string,
    @Body() body: UpdateQuestion
  ) {
    try {
      if (!param) {
        throw new UnprocessableEntityError("ID is required");
      }
      const data = await this.quizService.updateQuestion(body, param);
      return { data, success: true, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }

  @Delete("/quiz/:id")
  async DeleteOneQuestion(@Param("id") param: string) {
    try {
      if (!param) {
        throw new UnprocessableEntityError("ID is required");
      }
      const data = await this.quizService.deleteQuestion(param);
      return { data, success: true, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }

  @Post("/enrollment")
  async RecordScore(@Body() record: RecordScore) {
    try {
      const data = await this.enrollService.recordScore(record);
      return { data, success: true, status: resStatusCode.CREATED };
    } catch (error) {
      throw error;
    }
  }

  @Get("/dashboard-stats")
  async FacilitatorDashboard() {
    try {
      const data = await this.enrollService.facilitatorDashboardStat();
      return { data, status: resStatusCode.OK, success: true };
    } catch (error) {
      throw error;
    }
  }

  @Get("/student-tracker")
  async StudentTracker(@QueryParams() query: FindManyEnrollment) {
    try {
      const data = await this.enrollService.studentTracker(query);
      return { data, success: true, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }

  @Get("/quiz-performance")
  async QuizPerformance() {
    try {
      const data = await this.enrollService.quizPerformance();
      return { data, success: true, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }

  @Get("time-and-score-stats")
  async TimeAndScorePerformance() {
    try {
      const data = await this.enrollService.timePerformance();
      return { data, success: true, status: resStatusCode.OK };
    } catch (error) {
      throw error;
    }
  }
}
