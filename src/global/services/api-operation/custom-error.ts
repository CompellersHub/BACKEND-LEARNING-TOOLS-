// Base error class for the screening service
export class ScreeningError extends Error {
  originalError?: unknown;

  constructor(message: string, options?: { originalError?: unknown }) {
    super(message);
    this.name = "ScreeningError";
    this.originalError = options?.originalError;
  }
}

// For configuration-related errors
export class ConfigurationError extends ScreeningError {
  constructor(message: string) {
    super(message);
    this.name = "ConfigurationError";
  }
}

// For service availability issues
export class ServiceUnavailableError extends ScreeningError {
  constructor(message: string) {
    super(message);
    this.name = "ServiceUnavailableError";
  }
}
