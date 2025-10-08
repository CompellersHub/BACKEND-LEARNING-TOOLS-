// src/decorators/CatchMongooseErrors.ts
import mongoose from "mongoose";
import { HttpError } from "routing-controllers";

// Method-level decorator (for individual methods)
export function CatchMongooseErrors() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        handleMongooseError(error);
      }
    };

    return descriptor;
  };
}

// Class-level decorator (for all methods in controller)
export function CatchMongooseErrorsController() {
  return function (constructor: Function) {
    const methods = Object.getOwnPropertyNames(constructor.prototype);

    methods.forEach((methodName) => {
      // Skip constructor and non-function properties
      if (
        methodName === "constructor" ||
        typeof constructor.prototype[methodName] !== "function"
      ) {
        return;
      }

      const originalMethod = constructor.prototype[methodName];

      constructor.prototype[methodName] = async function (...args: any[]) {
        try {
          return await originalMethod.apply(this, args);
        } catch (error) {
          handleMongooseError(error);
        }
      };
    });
  };
}

// Shared error handling logic
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

// @Service()
// @Controller("/kyc")
// @CatchMongooseErrorsController() add to top level with controller
