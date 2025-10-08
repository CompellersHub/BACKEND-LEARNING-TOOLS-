"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
const dateFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
};
handlebars_1.default.registerHelper("formatDate", function (date) {
    if (!date)
        return "";
    return new Date(date).toLocaleDateString("en-US", dateFormatOptions);
});
handlebars_1.default.registerHelper("formatPrice", function (price) {
    return `$${price.toFixed(2)}`;
});
handlebars_1.default.registerHelper("fallback", function (value, fallback) {
    return value ?? fallback;
});
//# sourceMappingURL=helper.js.map