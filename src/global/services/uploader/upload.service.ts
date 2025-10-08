import { Service } from "typedi";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as crypto from "crypto";
import * as dotenv from "dotenv";
import { ForbiddenError } from "routing-controllers";
dotenv.config();

@Service()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
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

  public async upload(file: Express.Multer.File): Promise<string> {
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
        // ACL: 'public-read',
      };

      // Add timeout control
      const uploadPromise = await this.s3Client.send(
        new PutObjectCommand(s3Params)
      );

      // Set a timeout for the upload
      const timeoutPromise = new Promise(
        (_, reject) =>
          setTimeout(() => reject(new ForbiddenError("Upload timeout")), 45000) // 45 seconds
      );

      await Promise.race([uploadPromise, timeoutPromise]);
      // await this.s3Client.send(new PutObjectCommand(s3Params));

      return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com/${uniqueFileName}`;
    } catch (error) {
      throw error;
    }
  }

  private joinName(name: string): string {
    return name.replace(/\s+/g, "-");
  }
}
