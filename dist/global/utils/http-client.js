"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_rate_limit_1 = __importDefault(require("axios-rate-limit"));
const typedi_1 = require("typedi");
const api_operation_1 = require("../services/api-operation");
const helpers_1 = require("../helpers");
const logger = new helpers_1.Logger("Axios fetch");
let HttpClient = class HttpClient {
    constructor(retry) {
        this.retry = retry;
        this.DEFAULT_TIMEOUT = 10000;
        this.initializeInstance();
    }
    initializeInstance() {
        this.instance = axios_1.default.create({
            timeout: this.DEFAULT_TIMEOUT,
            headers: {
                "User-Agent": "YourApp/1.0 (contact@yourdomain.com)",
            },
        });
        this.instance = (0, axios_rate_limit_1.default)(this.instance, {
            maxRequests: 10,
            perMilliseconds: 1000,
        });
        this.configureInterceptors();
    }
    configureInterceptors() {
        this.instance.interceptors.request.use((config) => {
            logger.debug(`Outgoing request to ${config.url}`);
            return config;
        }, (error) => {
            logger.error("Request interceptor error", error);
            return Promise.reject(error);
        });
        this.instance.interceptors.response.use((response) => response, async (error) => {
            const config = error.config;
            if (!config) {
                return Promise.reject(error);
            }
            config._retryCount = config._retryCount || 0;
            const isRetryable = this.isErrorRetryable(error);
            const shouldRetry = isRetryable && config._retryCount < 3;
            if (!shouldRetry) {
                logger.error("Non-retryable error or max retries reached", JSON.stringify({
                    url: config.url,
                    method: config.method,
                    status: error.response?.status,
                    code: error.code,
                    retryCount: config._retryCount,
                }));
                return Promise.reject(error);
            }
            config._retryCount += 1;
            try {
                return await this.retry.withRetry(() => this.instance(config), {
                    retries: 3 - config._retryCount,
                    delay: 1000 * config._retryCount,
                });
            }
            catch (retryError) {
                logger.error("Retry attempts exhausted", JSON.stringify({
                    url: config.url,
                    method: config.method,
                    retryCount: config._retryCount,
                }));
                return Promise.reject(retryError);
            }
        });
    }
    isErrorRetryable(error) {
        return ([
            "ECONNABORTED",
            "ETIMEDOUT",
            "ENETUNREACH",
            "ECONNRESET",
        ].includes(error.code || "") ||
            [429, 503].includes(error.response?.status || 0));
    }
    getClient() {
        return this.instance;
    }
};
exports.HttpClient = HttpClient;
exports.HttpClient = HttpClient = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [api_operation_1.WithRetry])
], HttpClient);
//# sourceMappingURL=http-client.js.map