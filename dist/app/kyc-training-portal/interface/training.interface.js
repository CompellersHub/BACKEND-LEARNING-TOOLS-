"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shipType = exports.ownershipIdType = exports.mark = exports.riskLevel = exports.kycStatus = void 0;
var kycStatus;
(function (kycStatus) {
    kycStatus["queued"] = "queued";
    kycStatus["completed"] = "completed";
    kycStatus["underReview"] = "underReview";
    kycStatus["flagged"] = "flagged";
})(kycStatus || (exports.kycStatus = kycStatus = {}));
var riskLevel;
(function (riskLevel) {
    riskLevel["low"] = "LOW";
    riskLevel["medium"] = "MEDIUM";
    riskLevel["high"] = "HIGH";
})(riskLevel || (exports.riskLevel = riskLevel = {}));
var mark;
(function (mark) {
    mark["pending"] = "pending";
    mark["correct"] = "correct";
    mark["wrong"] = "wrong";
})(mark || (exports.mark = mark = {}));
var ownershipIdType;
(function (ownershipIdType) {
    ownershipIdType["pass"] = "Passport";
    ownershipIdType["id"] = "National ID";
    ownershipIdType["dl"] = "Driver's License";
    ownershipIdType["others"] = "others";
})(ownershipIdType || (exports.ownershipIdType = ownershipIdType = {}));
var shipType;
(function (shipType) {
    shipType["in"] = "individual";
    shipType["co"] = "corporate";
})(shipType || (exports.shipType = shipType = {}));
//# sourceMappingURL=training.interface.js.map