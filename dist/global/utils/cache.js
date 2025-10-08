"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppCache = void 0;
const node_cache_1 = __importDefault(require("node-cache"));
class AppCache {
    static getInstance() {
        if (!AppCache.instance) {
            AppCache.instance = new node_cache_1.default({
                stdTTL: 3600,
                checkperiod: 600,
                useClones: false,
            });
        }
        return AppCache.instance;
    }
    static generateKey(prefix, params) {
        return `${prefix}:${JSON.stringify(params)}`;
    }
}
exports.AppCache = AppCache;
exports.default = AppCache.getInstance();
//# sourceMappingURL=cache.js.map