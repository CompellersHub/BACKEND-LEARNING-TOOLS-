export declare class UploadService {
    private readonly s3Client;
    constructor();
    upload(file: Express.Multer.File): Promise<string>;
    private joinName;
}
