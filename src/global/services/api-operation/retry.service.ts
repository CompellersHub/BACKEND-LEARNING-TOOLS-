import { ForbiddenError } from "routing-controllers";
import { Service } from "typedi";

interface RetryOptions {
  retries?: number;
  delay?: number;
  backoff?: (attempt: number) => number;
}

@Service()
export class WithRetry {
  public async withRetry<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    const { retries = 3, delay = 1000 } = options;
    const backoff =
      options.backoff || ((attempt) => Math.pow(2, attempt) * delay);

    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt < retries) {
          const waitTime = backoff(attempt);
          await new Promise((resolve) => setTimeout(resolve, waitTime));
        }
      }
    }

    throw new RetryError(
      `Operation failed after ${retries} retries: ${lastError?.message}, originalError: ${lastError}`
    );
  }
}

export class RetryError extends Error {
  originalError?: Error;

  constructor(message: string, options?: { originalError?: Error }) {
    super(message);
    this.name = "RetryError";
    this.originalError = options?.originalError;
  }
}
