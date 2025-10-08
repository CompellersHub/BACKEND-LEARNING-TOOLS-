"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectedDecision = exports.PepCategory = exports.sanctionsResult = exports.eddType = exports.Action = void 0;
var Action;
(function (Action) {
    Action["dismiss"] = "Dismiss";
    Action["investigate"] = "Investigate";
    Action["escalate"] = "Escalate";
    Action["file"] = "File SAR";
    Action["edd"] = "Perform EDD";
})(Action || (exports.Action = Action = {}));
var eddType;
(function (eddType) {
    eddType["pep"] = "PEP Enhanced Due Diligence";
    eddType["sanctions"] = "Sanctions Review";
    eddType["financial"] = "Financial Crime Risk Review";
})(eddType || (exports.eddType = eddType = {}));
var sanctionsResult;
(function (sanctionsResult) {
    sanctionsResult["no"] = "No Match";
    sanctionsResult["false"] = "False Possible";
    sanctionsResult["match"] = "Possible Match";
    sanctionsResult["true"] = "True Match";
})(sanctionsResult || (exports.sanctionsResult = sanctionsResult = {}));
var PepCategory;
(function (PepCategory) {
    PepCategory["heads"] = "Heads of State and Government";
    PepCategory["seniorP"] = "Senior Politicians";
    PepCategory["seniorM"] = "Senior Military Officials";
    PepCategory["seniorJ"] = "Senior Judicial Officials";
    PepCategory["state"] = "State-Owned Enterprise Officials";
    PepCategory["intern"] = "International Organization Officials";
})(PepCategory || (exports.PepCategory = PepCategory = {}));
var selectedDecision;
(function (selectedDecision) {
    selectedDecision["close"] = "Close Case - Non Suspicious";
    selectedDecision["approve"] = "Approve EDD";
    selectedDecision["file"] = "File SAR Report";
})(selectedDecision || (exports.selectedDecision = selectedDecision = {}));
//# sourceMappingURL=alert.interface.js.map