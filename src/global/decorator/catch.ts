import mongoose from "mongoose";
import { HttpError } from "routing-controllers";

export function CatchMongooseErrors() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    console.log(target, propertyKey);
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          //   const errors = Object.fromEntries(
          //     Object.entries(error.errors).map(([key, value]) => [
          //       key,
          //       value.message,
          //     ])
          //   );
          throw new HttpError(
            422,
            `name: ${error.name}, message: ${error.message}`
          );
        }

        if (error instanceof mongoose.Error.CastError) {
          throw new HttpError(
            400,
            `Invalid value for ${error.path}: ${error.value}`
          );
        }

        if (error instanceof mongoose.Error) {
          throw new HttpError(400, error.message);
        }

        throw error;
      }
    };

    return descriptor;
  };
}

// usage
// @CatchMongooseErrors()
