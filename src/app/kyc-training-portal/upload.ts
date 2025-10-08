import multer from "multer";
import { UnprocessableEntityError } from "routing-controllers";

const storage = multer.memoryStorage();
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

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (ALLOWED_MIME.includes(file.mimetype)) {
    cb(null, true); // accept
  } else {
    cb(
      new UnprocessableEntityError(
        "A Document has invalid file type. Only JPEG, PNG, DOCX, DOC, XLC, XLSX, PPT, PPTX, TXT, CSV or PDF are allowed"
      )
    ); // reject
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export const loadAny = upload.any();

export const expectedFiles = [
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
