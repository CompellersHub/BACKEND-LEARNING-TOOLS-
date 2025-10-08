"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.agenda = void 0;
const agenda_1 = __importDefault(require("agenda"));
exports.agenda = new agenda_1.default({
    db: { address: process.env.MONGO_URI_JOB },
});
//# sourceMappingURL=agenda.js.map