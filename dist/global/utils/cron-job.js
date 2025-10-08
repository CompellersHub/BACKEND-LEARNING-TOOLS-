"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleRunner = void 0;
const model_1 = require("../../app/smart-search/model");
const cron_1 = require("cron");
class ScheduledJob {
    constructor() {
        this.isRunning = false;
        this.updateScreeningCounter = async () => {
            try {
                if (this.isRunning) {
                    console.log("Previous job still running, skipping this execution");
                    return;
                }
                this.isRunning = true;
                const year = new Date().getFullYear();
                const session = await model_1.ScreeningModel.startSession();
                try {
                    await session.withTransaction(async () => {
                        await model_1.ScreeningModel.updateMany({ year }, { $set: { isUpdating: true } }, { session });
                        console.log("transaction in process");
                        await model_1.ScreeningModel.updateMany({ year }, [
                            {
                                $set: {
                                    total: { $add: ["$total", "$yesterday"] },
                                    yesterday: "$today",
                                    today: 0,
                                },
                            },
                        ], { session });
                        await model_1.ScreeningModel.updateMany({ year }, { $set: { isUpdating: false } }, { session });
                    });
                    await session.commitTransaction();
                    console.log("Screening count updated at midnight.");
                }
                catch (error) {
                    console.error("Error updating screening count:", error);
                }
                finally {
                    this.isRunning = false;
                    await session.endSession();
                    console.log("done");
                }
            }
            catch (error) {
                console.error("Error scheduling CopyCount cron job:", error);
            }
        };
    }
    async runJob() {
        const getJobInfo = new cron_1.CronJob(`00 00 00 * * *`, async () => {
            try {
                await this.updateScreeningCounter();
            }
            catch (error) {
                if (error instanceof Error)
                    console.log(`Error in cron script : ${error.message}`);
            }
        }, null, true, "utc");
        const ms = getJobInfo.cronTime.getTimeout();
        const nextRun = new Date(Date.now() + ms);
        console.log("⏰ Next run time:", nextRun.toUTCString());
    }
}
exports.ScheduleRunner = new ScheduledJob();
//# sourceMappingURL=cron-job.js.map