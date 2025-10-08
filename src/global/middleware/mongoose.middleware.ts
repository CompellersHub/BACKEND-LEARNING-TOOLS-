import {
  Middleware,
  ExpressErrorMiddlewareInterface,
} from "routing-controllers";
import mongoose from "mongoose";
import { Service } from "typedi";
import { NextFunction, Request, Response } from "express";

@Service()
@Middleware({ type: "after" })
export class MongooseErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: NextFunction): void {
    // Check if headers are already sent
    if (res.headersSent) {
      return next(error);
    }

    // Mongoose validation errors
    if (error instanceof mongoose.Error.ValidationError) {
      const errors: Record<string, string> = {};

      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }

      res.status(422).json({
        status: "error",
        type: "ValidationError",
        message: "Validation failed",
        errors,
      });
      return;
    }

    // Mongoose cast errors (like the one you're seeing)
    if (error instanceof mongoose.Error.CastError) {
      res.status(400).json({
        status: "error",
        type: "CastError",
        message: `Invalid value for ${error.path}: ${error.value}`,
        field: error.path,
        value: error.value,
      });
      return;
    }

    // Duplicate key errors
    if (error.code === 11000) {
      res.status(409).json({
        status: "error",
        type: "DuplicateKeyError",
        message: "Duplicate key error",
        keyValue: error.keyValue,
      });
      return;
    }

    // Other Mongoose errors
    if (error instanceof mongoose.Error) {
      res.status(400).json({
        status: "error",
        type: error.name,
        message: error.message,
      });
      return;
    }

    // Pass to next error handler if not a Mongoose error
    next(error);
  }
}
