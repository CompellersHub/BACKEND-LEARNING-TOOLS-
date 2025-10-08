export declare class ScreeningError extends Error {
    originalError?: unknown;
    constructor(message: string, options?: {
        originalError?: unknown;
    });
}
export declare class ConfigurationError extends ScreeningError {
    constructor(message: string);
}
export declare class ServiceUnavailableError extends ScreeningError {
    constructor(message: string);
}
