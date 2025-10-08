"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = exports.formattedErrors = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const constant_1 = require("../constant");
const formattedErrors = (errors) => {
    return errors.map((error) => {
        if (error.children && error.children.length > 0) {
            return {
                property: error.property,
                children: (0, exports.formattedErrors)(error.children),
            };
        }
        return {
            property: error.property,
            message: error.constraints,
        };
    });
};
exports.formattedErrors = formattedErrors;
const validation = async (dto, data) => {
    const query = (0, class_transformer_1.plainToInstance)(dto, data);
    const errors = await (0, class_validator_1.validate)(query, {
        whitelist: true,
        forbidNonWhitelisted: false,
    });
    if (errors.length > 0) {
        return {
            success: false,
            status: constant_1.resStatusCode.BAD_REQUEST,
            error: (0, exports.formattedErrors)(errors),
        };
    }
    return true;
};
exports.validation = validation;
//# sourceMappingURL=validate.js.map