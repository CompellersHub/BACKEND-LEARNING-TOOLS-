import { resStatusCode } from "../../global/constant";
import { CreateQuestion, FindManyEnrollment, FindManyQuestion, FindOneQuestion, RecordScore, UpdateQuestion } from "./dto";
import { EnrollService, QuizService } from "./services";
export declare class QuizController {
    private readonly quizService;
    private readonly enrollService;
    constructor(quizService: QuizService, enrollService: EnrollService);
    CreateNewQuestions(body: CreateQuestion): Promise<{
        data: import("./interface").IQuestion;
        success: boolean;
        status: resStatusCode;
    }>;
    FindManyQuiz(query: FindManyQuestion): Promise<{
        data: import("mongoose").PaginateResult<import("./interface").IQuestion>;
        status: resStatusCode;
        success: boolean;
    }>;
    FindOneQuestion(query: FindOneQuestion): Promise<{
        data: import("./interface").IQuestion;
        status: resStatusCode;
        success: boolean;
    }>;
    UpdateOneQuestion(param: string, body: UpdateQuestion): Promise<{
        data: import("./interface").IQuestion;
        success: boolean;
        status: resStatusCode;
    }>;
    DeleteOneQuestion(param: string): Promise<{
        data: import("mongoose").Document<unknown, {}, import("./interface").IQuestion, {}, {}> & import("./interface").IQuestion & Required<{
            _id: string;
        }> & {
            __v: number;
        };
        success: boolean;
        status: resStatusCode;
    }>;
    RecordScore(record: RecordScore): Promise<{
        data: {
            message: string;
        };
        success: boolean;
        status: resStatusCode;
    }>;
    FacilitatorDashboard(): Promise<{
        data: import("./interface").dashboardResponse;
        status: resStatusCode;
        success: boolean;
    }>;
    StudentTracker(query: FindManyEnrollment): Promise<{
        data: import("../../global/entities").PaginateResult<unknown>;
        success: boolean;
        status: resStatusCode;
    }>;
    QuizPerformance(): Promise<{
        data: import("./interface").quizPerformanceResponse[];
        success: boolean;
        status: resStatusCode;
    }>;
    TimeAndScorePerformance(): Promise<{
        data: import("./interface").scoreAndTime;
        success: boolean;
        status: resStatusCode;
    }>;
}
