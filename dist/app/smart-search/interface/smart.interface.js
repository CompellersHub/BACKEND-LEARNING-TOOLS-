"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchStatus = exports.smartRank = exports.smartType = void 0;
var smartType;
(function (smartType) {
    smartType["in"] = "Individual";
    smartType["company"] = "Company";
    smartType["Vessel"] = "Vessel";
})(smartType || (exports.smartType = smartType = {}));
var smartRank;
(function (smartRank) {
    smartRank["low"] = "Low";
    smartRank["high"] = "High";
    smartRank["medium"] = "Medium";
})(smartRank || (exports.smartRank = smartRank = {}));
var watchStatus;
(function (watchStatus) {
    watchStatus["active"] = "Active";
    watchStatus["inactive"] = "Inactive";
})(watchStatus || (exports.watchStatus = watchStatus = {}));
//# sourceMappingURL=smart.interface.js.map