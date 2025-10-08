// src/decorators/GlobalMongooseErrorHandler.ts
import mongoose from "mongoose";
import { HttpError } from "routing-controllers";
import { getMetadataArgsStorage } from "routing-controllers";

// Apply to all controllers automatically
export function enableGlobalMongooseErrorHandling() {
  const storage = getMetadataArgsStorage();

  storage.controllers.forEach((controller) => {
    const methods = Object.getOwnPropertyNames(controller.target.prototype);

    methods.forEach((methodName) => {
      if (
        methodName === "constructor" ||
        typeof controller.target.prototype[methodName] !== "function"
      ) {
        return;
      }

      const originalMethod = controller.target.prototype[methodName];

      controller.target.prototype[methodName] = async function (
        ...args: any[]
      ) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          handleMongooseError(error);
        }
      };
    });
  });
}

function handleMongooseError(error: any): never {
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.fromEntries(
      Object.entries(error.errors).map(([key, value]) => [key, value.message])
    );
    throw new HttpError(422, "Validation failed");
  }

  if (error instanceof mongoose.Error.CastError) {
    throw new HttpError(400, `Invalid value for ${error.path}: ${error.value}`);
  }

  if (error instanceof mongoose.Error) {
    throw new HttpError(400, error.message);
  }

  throw error;
}

// Enable global mongoose error handling for ALL controllers
// enableGlobalMongooseErrorHandling(); add to main.ts
