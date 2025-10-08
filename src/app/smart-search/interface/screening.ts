import { Types } from "mongoose";

export interface ScreeningCount {
  screeningId: Types.ObjectId;
  month: number;
  year: number;
  today: number;
  yesterday: number;
  total: number;
  isUpdating: boolean;
}

export enum massStatus {
  false = "False Positive",
  true = "True Match",
  possible = "Possible Match/Escalate for Review",
  pending = "Pending/Under Review",
}

export interface reviewOnSearch {
  _id: Types.ObjectId;
  massReviewStatus: massStatus;
  massReviewRationale?: string;
  screeningId: Types.ObjectId;
  reviewer: Types.ObjectId;
  student: Types.ObjectId;
}

export type createReview = Pick<
  reviewOnSearch,
  "massReviewRationale" | "massReviewStatus" | "screeningId"
>;

export type assignReviewer = Pick<reviewOnSearch, "reviewer" | "_id">;
