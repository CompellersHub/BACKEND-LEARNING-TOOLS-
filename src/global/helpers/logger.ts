function getTimestamp() {
  return new Date().toISOString();
}

export class Logger {
  context: string;

  constructor(context: string) {
    this.context = context || "Application";
  }

  private async log(level: string, message: any, ...optionalParams: any) {
    console.log(
      `[${level}] [${getTimestamp()}] [${this.context}]`,
      message,
      ...optionalParams
    );
  }

  async info(message: any, ...optionalParams: any) {
    await this.log("INFO", message, ...optionalParams);
  }

  async warn(message: any, ...optionalParams: any) {
    await this.log("WARN", message, ...optionalParams);
  }

  async error(
    message: any,
    errorStack: Error | string = "",
    ...optionalParams: any
  ) {
    await this.log("ERROR", message, ...optionalParams);
    if (errorStack) {
      console.log(errorStack);
    }
  }

  async debug(message: any, ...optionalParams: any) {
    if (process.env.NODE_ENV === "development") {
      await this.log("DEBUG", message, ...optionalParams);
    }
  }
}

// export const Logger = winston.createLogger({
//   level: "error",
//   format: winston.format.json(),
//   transports: [new winston.transports.File({ filename: "error.log" })],
// });
