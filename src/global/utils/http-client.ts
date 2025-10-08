import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import rateLimit from "axios-rate-limit";
import { Service, Inject } from "typedi";
import { WithRetry } from "../services/api-operation";
import { Logger } from "../helpers";

const logger = new Logger("Axios fetch");
@Service()
export class HttpClient {
  private instance: AxiosInstance;
  private readonly DEFAULT_TIMEOUT = 10000; // 10 seconds

  constructor(
    @Inject()
    private readonly retry: WithRetry
  ) {
    this.initializeInstance();
  }

  private initializeInstance(): void {
    this.instance = axios.create({
      timeout: this.DEFAULT_TIMEOUT,
      headers: {
        "User-Agent": "YourApp/1.0 (contact@yourdomain.com)",
      },
    });

    // Apply rate limiting
    this.instance = rateLimit(this.instance, {
      maxRequests: 10,
      perMilliseconds: 1000,
    });

    this.configureInterceptors();
  }

  private configureInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        logger.debug(`Outgoing request to ${config.url}`);
        return config;
      },
      (error) => {
        logger.error("Request interceptor error", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const config = error.config as
          | (AxiosRequestConfig & { _retryCount?: number })
          | undefined;

        if (!config) {
          return Promise.reject(error);
        }

        config._retryCount = config._retryCount || 0;

        const isRetryable = this.isErrorRetryable(error);
        const shouldRetry = isRetryable && config._retryCount < 3;

        if (!shouldRetry) {
          logger.error(
            "Non-retryable error or max retries reached",
            JSON.stringify({
              url: config.url,
              method: config.method,
              status: error.response?.status,
              code: error.code,
              retryCount: config._retryCount,
            })
          );
          return Promise.reject(error);
        }

        config._retryCount += 1;

        try {
          return await this.retry.withRetry(() => this.instance(config), {
            retries: 3 - config._retryCount, // Remaining retries
            delay: 1000 * config._retryCount, // Progressive delay
          });
        } catch (retryError) {
          logger.error(
            "Retry attempts exhausted",
            JSON.stringify({
              url: config.url,
              method: config.method,
              retryCount: config._retryCount,
            })
          );
          return Promise.reject(retryError);
        }
      }
    );
  }

  private isErrorRetryable(error: AxiosError): boolean {
    return (
      [
        "ECONNABORTED", // Timeout
        "ETIMEDOUT", // Connection timeout
        "ENETUNREACH", // Network unreachable
        "ECONNRESET", // Connection reset
      ].includes(error.code || "") ||
      [429, 503].includes(error.response?.status || 0)
    );
  }

  public getClient(): AxiosInstance {
    return this.instance;
  }
}
