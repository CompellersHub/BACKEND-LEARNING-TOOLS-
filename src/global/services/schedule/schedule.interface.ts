import { create } from "@/app/kyc-training-portal/interface";
import { uploadFile } from "@/global/entities";
import { JobAttributes } from "agenda";

export interface KYCSchedule extends JobAttributes {
  body: create;
  files: uploadFile[];
  caseId: string;
}

export enum Jobs {
  kyc = "KYC-CREATE",
}
