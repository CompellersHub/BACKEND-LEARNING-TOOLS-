import { ScreeningModel } from "@/app/smart-search/model";
import { CronJob } from "cron";

class ScheduledJob {
  private isRunning = false;

  async runJob() {
    const getJobInfo = new CronJob(
      `00 00 00 * * *`,
      async () => {
        try {
          await this.updateScreeningCounter();
        } catch (error: unknown) {
          if (error instanceof Error)
            console.log(`Error in cron script : ${error.message}`);
        }
      },
      null, // onComplete
      true, // start
      "utc"
    );

    const ms = getJobInfo.cronTime.getTimeout();
    const nextRun = new Date(Date.now() + ms);
    console.log("⏰ Next run time:", nextRun.toUTCString());
  }

  private updateScreeningCounter = async () => {
    try {
      if (this.isRunning) {
        console.log("Previous job still running, skipping this execution");
        return;
      }

      this.isRunning = true;
      const year = new Date().getFullYear();
      const session = await ScreeningModel.startSession();

      try {
        await session.withTransaction(async () => {
          // Step 1: Set isUpdating to true
          await ScreeningModel.updateMany(
            { year },
            { $set: { isUpdating: true } },
            { session }
          );

          console.log("transaction in process");

          // Step 2: Perform the main update
          await ScreeningModel.updateMany(
            { year },
            [
              {
                $set: {
                  total: { $add: ["$total", "$yesterday"] },
                  yesterday: "$today",
                  today: 0,
                },
              },
            ],
            { session }
          );

          // Step 3: Set isUpdating back to false
          await ScreeningModel.updateMany(
            { year },
            { $set: { isUpdating: false } },
            { session }
          );
        });
        await session.commitTransaction();
        console.log("Screening count updated at midnight.");
      } catch (error) {
        console.error("Error updating screening count:", error);
        // Transaction will automatically abort
      } finally {
        this.isRunning = false;
        await session.endSession();
        console.log("done");
      }
    } catch (error) {
      console.error("Error scheduling CopyCount cron job:", error);
    }
  };
}

export const ScheduleRunner = new ScheduledJob();
