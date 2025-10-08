import { Service } from "typedi";
import { agenda } from "./agenda";
import { Jobs, KYCSchedule } from "./schedule.interface";
import { Job } from "agenda";
import { KycTrainingPortalService } from "@/app/kyc-training-portal/kyc.service";

@Service()
export class ScheduleService {
  constructor(private readonly kycService: KycTrainingPortalService) {
    this.defineJobs();
  }

  private defineJobs() {
    agenda.define<KYCSchedule>(Jobs.kyc, async (job: Job<KYCSchedule>) => {
      const { body, files, caseId } = job.attrs.data;
      await this.kycService.kycScheduleCreate(body, files, caseId);
    });
  }
}
