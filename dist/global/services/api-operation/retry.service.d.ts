interface RetryOptions {
    retries?: number;
    delay?: number;
    backoff?: (attempt: number) => number;
}
export declare class WithRetry {
    withRetry<T>(operation: () => Promise<T>, options?: RetryOptions): Promise<T>;
}
export declare class RetryError extends Error {
    originalError?: Error;
    constructor(message: string, options?: {
        originalError?: Error;
    });
}
export {};
