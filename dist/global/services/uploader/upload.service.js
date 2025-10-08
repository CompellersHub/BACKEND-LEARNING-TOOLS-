"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const typedi_1 = require("typedi");
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto = __importStar(require("crypto"));
const dotenv = __importStar(require("dotenv"));
const routing_controllers_1 = require("routing-controllers");
dotenv.config();
let UploadService = class UploadService {
    constructor() {
        this.s3Client = new client_s3_1.S3Client({
            region: process.env.S3_REGION,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            },
            requestHandler: {
                requestTimeout: 30000,
            },
            maxAttempts: 5,
            retryMode: "standard",
        });
    }
    async upload(file) {
        try {
            const uniqueFileName = `${crypto
                .randomBytes(16)
                .toString("hex")}-${this.joinName(file.originalname)}`;
            const bucketName = process.env.S3_BUCKET;
            const s3Params = {
                Bucket: bucketName,
                Key: uniqueFileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            const uploadPromise = await this.s3Client.send(new client_s3_1.PutObjectCommand(s3Params));
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new routing_controllers_1.ForbiddenError("Upload timeout")), 45000));
            await Promise.race([uploadPromise, timeoutPromise]);
            return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${uniqueFileName}`;
        }
        catch (error) {
            throw error;
        }
    }
    joinName(name) {
        return name.replace(/\s+/g, "-");
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map