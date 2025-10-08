"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypted = exports.encryption = void 0;
const crypto_1 = require("crypto");
const util_1 = require("util");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const password = process.env.ENCRYPTION;
const encryption = async (textToEncrypt) => {
    const iv = (0, crypto_1.randomBytes)(16);
    const key = (await (0, util_1.promisify)(crypto_1.scrypt)(password, "salt", 32));
    const cipher = (0, crypto_1.createCipheriv)("aes-256-ctr", key, iv);
    const encryptedText = Buffer.concat([
        cipher.update(textToEncrypt, "utf8"),
        cipher.final(),
    ]);
    return Buffer.concat([iv, encryptedText]).toString("hex");
};
exports.encryption = encryption;
const decrypted = async (encryptedHex) => {
    const encryptedBuffer = Buffer.from(encryptedHex, "hex");
    const iv = encryptedBuffer.subarray(0, 16);
    const encryptedText = encryptedBuffer.subarray(16);
    const key = (await (0, util_1.promisify)(crypto_1.scrypt)(password, "salt", 32));
    const decipher = (0, crypto_1.createDecipheriv)("aes-256-ctr", key, iv);
    const decryptedText = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
    ]);
    return decryptedText.toString("utf8");
};
exports.decrypted = decrypted;
//# sourceMappingURL=encryption.js.map