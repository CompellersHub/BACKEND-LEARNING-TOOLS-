declare class ScheduledJob {
    private isRunning;
    runJob(): Promise<void>;
    private updateScreeningCounter;
}
export declare const ScheduleRunner: ScheduledJob;
export {};
