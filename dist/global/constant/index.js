"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resStatusCode = exports.modelName = void 0;
var modelName;
(function (modelName) {
})(modelName || (exports.modelName = modelName = {}));
var resStatusCode;
(function (resStatusCode) {
    resStatusCode[resStatusCode["OK"] = 200] = "OK";
    resStatusCode[resStatusCode["CREATED"] = 201] = "CREATED";
    resStatusCode[resStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    resStatusCode[resStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    resStatusCode[resStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    resStatusCode[resStatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    resStatusCode[resStatusCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    resStatusCode[resStatusCode["UNPROCESSABLE"] = 422] = "UNPROCESSABLE";
    resStatusCode[resStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    resStatusCode[resStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    resStatusCode[resStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(resStatusCode || (exports.resStatusCode = resStatusCode = {}));
//# sourceMappingURL=index.js.map