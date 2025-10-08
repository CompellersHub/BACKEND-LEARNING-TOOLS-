import { ExpressErrorMiddlewareInterface } from "routing-controllers";
import { NextFunction, Request, Response } from "express";
export declare class MongooseErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, req: Request, res: Response, next: NextFunction): void;
}
