import { Service } from "typedi";

@Service()
export class Timeout {
  public async withTimeout<T>(
    promise: Promise<T>,
    ms: number
    // timeoutError = new ApiTimeoutError(`Operation timed out after ${ms}ms`)
  ): Promise<T> {
    // Create a timeout promise that rejects after ms milliseconds
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(), ms); //reject(timeoutError), ms);
    });

    // Returns a race between our promise and the timeout
    return Promise.race([promise, timeout]);
  }
}

// export class ApiTimeoutError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = "ApiTimeoutError";
//   }
// }
