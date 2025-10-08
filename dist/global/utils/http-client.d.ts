import { AxiosInstance } from "axios";
import { WithRetry } from "../services/api-operation";
export declare class HttpClient {
    private readonly retry;
    private instance;
    private readonly DEFAULT_TIMEOUT;
    constructor(retry: WithRetry);
    private initializeInstance;
    private configureInterceptors;
    private isErrorRetryable;
    getClient(): AxiosInstance;
}
