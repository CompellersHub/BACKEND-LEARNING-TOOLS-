import {
  Middleware,
  ExpressErrorMiddlewareInterface,
  HttpError,
  UnprocessableEntityError,
} from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "class-validator";
import { Service } from "typedi";
import { MongooseError } from "mongoose";
import multer from "multer";

interface ValidationHttpError extends HttpError {
  errors: ValidationError[];
}

@Service()
@Middleware({ type: "after" })
export class CustomValidationErrorHandler
  implements ExpressErrorMiddlewareInterface
{
  error(error: any, req: Request, res: Response, next: NextFunction): void {
    // Handle stream errors specifically
    if (
      error.message?.includes("stream") &&
      error.message?.includes("readable")
    ) {
      res.status(400).json({
        status: "error",
        message: "Invalid request payload",
        details: "The request body could not be processed",
      });
      return;
    }

    if (res.headersSent) return next(error);

    // Handle UnprocessableEntityError (422) explicitly
    if (error instanceof UnprocessableEntityError || error.httpCode === 422) {
      res.status(422).json({
        status: 422,
        success: false,
        message: error.message || "Validation failed",
      });
      return;
    }

    // Handle class-validator errors
    if (this.isValidationError(error)) {
      res.status(422).json({
        status: 422,
        success: false,
        message: "Validation failed",
        errors: this.formatValidationErrors(error.errors),
      });
      return;
    }

    // Handle routing-controllers HttpErrors
    if (error instanceof HttpError) {
      res.status(error.httpCode).json({
        status: error.httpCode,
        message: error.message,
        ...(process.env.NODE_ENV === "development" && {
          stack: error.stack,
          originalError: error,
        }),
        error: error.name,
      });
      return;
    }

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        res.status(400).json({
          status: 422,
          success: false,
          message: "File Validation failed",
          errors: "Image must be less then or equal to 2 MB",
        });
      }
      // next(error);
      return;
    }

    if (error instanceof MongooseError) {
      res.status(400).json({
        status: 400,
        message: error.message,
        ...(process.env.NODE_ENV === "development" && {
          stack: error.stack,
          originalError: error,
        }),
        error: error.name,
      });
      return;
    }

    // Uncaught errors
    console.error("Unhandled Error:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
      ...(process.env.NODE_ENV === "development" && {
        stack: error.stack,
        originalError: error.toString(),
      }),
    });
    return;
  }

  private isValidationError(error: any): error is ValidationHttpError {
    return (
      error instanceof HttpError &&
      error.httpCode === 400 &&
      Array.isArray((error as any).errors) &&
      (error as any).errors.some((e: any) => e instanceof ValidationError)
    );
  }

  private formatValidationErrors(errors: ValidationError[]): any[] {
    return errors.map((error) => {
      if (error.children?.length > 0) {
        return {
          field: error.property,
          children: this.formatValidationErrors(error.children),
        };
      }
      return {
        field: error.property,
        messages: Object.values(error.constraints || {}),
      };
    });
  }
}
