"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserChecker = exports.authorizationChecker = void 0;
const utils_1 = require("../utils");
const authorizationChecker = async (action, roles) => {
    const user = await (0, utils_1.getUserFromRequest)(action.request);
    if (user && !roles.length)
        return true;
    if (user && roles.find((role) => user.role.indexOf(role) !== -1)) {
        return true;
    }
    return false;
};
exports.authorizationChecker = authorizationChecker;
const currentUserChecker = async (action) => {
    return (0, utils_1.getUserFromRequest)(action.request);
};
exports.currentUserChecker = currentUserChecker;
//# sourceMappingURL=authorization.js.map