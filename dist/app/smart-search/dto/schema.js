"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVRowSchema = void 0;
const zod_1 = require("zod");
exports.CSVRowSchema = zod_1.z.object({
    fullName: zod_1.z.string().optional(),
    country: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string().optional(),
    entityType: zod_1.z.string().optional(),
    nationality: zod_1.z.string().optional(),
    additional: zod_1.z.string().optional(),
});
//# sourceMappingURL=schema.js.map