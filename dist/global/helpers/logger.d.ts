export declare class Logger {
    context: string;
    constructor(context: string);
    private log;
    info(message: any, ...optionalParams: any): Promise<void>;
    warn(message: any, ...optionalParams: any): Promise<void>;
    error(message: any, errorStack?: Error | string, ...optionalParams: any): Promise<void>;
    debug(message: any, ...optionalParams: any): Promise<void>;
}
