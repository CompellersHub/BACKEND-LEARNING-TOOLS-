import { FindMany, FindOne } from "../../../global/entities";
import { Types } from "mongoose";
import { Action, createAlert, findManyAlert, findManyMonitor, findManyTransaction, findOneProfile, severity } from "../interface";
export declare class FindManyMonitorProfile extends FindMany implements findManyMonitor {
    severity?: severity;
}
export declare class CreateAlert implements createAlert {
    action: Action;
    comment: string;
    alert: Types.ObjectId;
    student?: Types.ObjectId;
}
export declare class FindManyAlert extends FindMany implements findManyAlert {
    severity?: severity;
}
export declare class FindOneProfile extends FindOne implements findOneProfile {
    customerId?: string;
    fullName?: string;
}
export declare class FindManyTransaction extends FindMany implements findManyTransaction {
    type?: "recent" | "years";
    status?: string[];
    customer?: Types.ObjectId;
    from?: Date;
    end?: Date;
}
