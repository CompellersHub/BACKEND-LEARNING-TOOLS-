import { dashboardResponse, enrollment, findManyEnrollment, quizPerformanceResponse, scoreAndTime } from "../interface";
import { EnrollModel } from "../model";
import { UserModel } from "../../../app/user/model";
export declare class EnrollService {
    private readonly enrollModel;
    private readonly userModel;
    constructor(enrollModel: typeof EnrollModel, userModel: typeof UserModel);
    recordScore: (create: enrollment) => Promise<{
        message: string;
    }>;
    facilitatorDashboardStat: () => Promise<dashboardResponse>;
    studentTracker: (query: findManyEnrollment) => Promise<import("../../../global/entities").PaginateResult<unknown>>;
    quizPerformance: () => Promise<quizPerformanceResponse[]>;
    timePerformance: () => Promise<scoreAndTime>;
}
