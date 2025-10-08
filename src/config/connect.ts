import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const DATABASE_URL = process.env.MONGO_URI;
declare global {
  var mongoose:
    | {
        conn: typeof import("mongoose") | null;
        promise: Promise<typeof import("mongoose")> | null;
      }
    | undefined;
}

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connection = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
        return mongoose;
      });
    }
    cached.conn = await cached.promise;
    // await Promise.all([
    //   await TrainerModel.syncIndexes(),
    //   await UserModel.syncIndexes(),
    // ]);
    console.log(`mongoose connected ${cached.conn.connection.host}`);
    return cached.conn;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Error connecting to MongoDB:", error);
    }
    process.exit(1);
  }
};
