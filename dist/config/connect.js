"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const DATABASE_URL = process.env.MONGO_URI;
if (!DATABASE_URL) {
    throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}
let cached = global.mongoose;
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}
const connection = async () => {
    try {
        if (cached.conn) {
            return cached.conn;
        }
        if (!cached.promise) {
            const opts = {
                bufferCommands: false,
            };
            cached.promise = mongoose_1.default.connect(DATABASE_URL, opts).then((mongoose) => {
                return mongoose;
            });
        }
        cached.conn = await cached.promise;
        console.log(`mongoose connected ${cached.conn.connection.host}`);
        return cached.conn;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error connecting to MongoDB:", error.message);
        }
        else {
            console.error("Error connecting to MongoDB:", error);
        }
        process.exit(1);
    }
};
exports.connection = connection;
//# sourceMappingURL=connect.js.map