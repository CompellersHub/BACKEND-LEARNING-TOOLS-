"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAllModels = registerAllModels;
const typedi_1 = require("typedi");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function walkAndRegisterModels(dir) {
    const items = fs_1.default.readdirSync(dir);
    for (const item of items) {
        const fullPath = path_1.default.join(dir, item);
        const stat = fs_1.default.statSync(fullPath);
        if (stat.isDirectory()) {
            if (item === "model") {
                fs_1.default.readdirSync(fullPath).forEach((file) => {
                    if ((file.endsWith(".ts") || file.endsWith(".js")) &&
                        !file.endsWith(".d.ts")) {
                        const modelFile = require(path_1.default.join(fullPath, file));
                        for (const key in modelFile) {
                            const exported = modelFile[key];
                            if (typeof exported === "object" ||
                                typeof exported === "function") {
                                const token = key.charAt(0).toLowerCase() + key.slice(1);
                                typedi_1.Container.set(token, exported);
                            }
                        }
                    }
                });
            }
            else {
                walkAndRegisterModels(fullPath);
            }
        }
    }
}
function registerAllModels() {
    const rootPath = path_1.default.join(__dirname);
    walkAndRegisterModels(rootPath);
}
//# sourceMappingURL=register-models.js.map