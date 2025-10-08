import { Document, PaginateModel } from "mongoose";
import { KycTrainingPortal } from "../interface";
export type TrainingDocument = KycTrainingPortal & Document;
export declare const TrainerModel: PaginateModel<KycTrainingPortal>;
