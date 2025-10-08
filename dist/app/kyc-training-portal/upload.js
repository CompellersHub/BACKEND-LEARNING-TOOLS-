"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectedFiles = exports.loadAny = void 0;
const multer_1 = __importDefault(require("multer"));
const routing_controllers_1 = require("routing-controllers");
const storage = multer_1.default.memoryStorage();
const ALLOWED_MIME = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv",
];
const fileFilter = (req, file, cb) => {
    if (ALLOWED_MIME.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new routing_controllers_1.UnprocessableEntityError("A Document has invalid file type. Only JPEG, PNG, DOCX, DOC, XLC, XLSX, PPT, PPTX, TXT, CSV or PDF are allowed"));
    }
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 },
});
exports.loadAny = upload.any();
exports.expectedFiles = [
    "annualReportDocument",
    "incorporationCertificateDocument",
    "listOfDirectorsDocument",
    "shareholdersDocument",
    "memorandumDocument",
    "natureOfBusinessDocument",
    "proofOfIdDocument",
    "proofOfIdUboDocument",
    "proofOfListingDocument",
    "proofOfRegulationDocument",
    "sanctionScreeningDocument",
    "sanctionScreeningUboDocument",
];
//# sourceMappingURL=upload.js.map