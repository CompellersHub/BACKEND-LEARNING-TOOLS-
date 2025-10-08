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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorService = void 0;
const helpers_1 = require("../../../global/helpers");
const utils_1 = require("../../../global/utils");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const interface_1 = require("../interface");
const define_1 = require("./define");
let MonitorService = class MonitorService extends define_1.Define {
    constructor(profile, alert, alertRecord, transaction) {
        super();
        this.profile = profile;
        this.alert = alert;
        this.alertRecord = alertRecord;
        this.transaction = transaction;
    }
    async submitReviewAlert(data) {
        try {
            const findAlert = await this.alert.findById(data.alert);
            if (!findAlert) {
                throw new routing_controllers_1.NotFoundError("Alert not found");
            }
            return this.alertRecord.create(data);
        }
        catch (error) {
            throw error;
        }
    }
    async analyticsDashboard() {
        const [activeAlert, SARFile, positiveFalse, countries, highRisk, distribution,] = await Promise.allSettled([
            this.alert.aggregate([
                { $project: { lowerCaseStatus: { $toLower: "$status" } } },
                { $match: { lowerCaseStatus: "open" } },
                { $group: { _id: null, active: { $sum: 1 } } },
            ]),
            this.alertRecord.aggregate([
                { $match: { action: interface_1.Action.file } },
                { $group: { _id: null, sarfiles: { $sum: 1 } } },
            ]),
            this.alertRecord.aggregate([
                { $match: { action: interface_1.Action.dismiss } },
                { $group: { _id: null, dismiss: { $sum: 1 } } },
            ]),
            this.alert.aggregate([
                { $project: { lowerCaseCountry: { $toLower: "$geoLocation" } } },
                { $group: { _id: "$lowerCaseCountry" } },
                { $count: "uniqueCountries" },
            ]),
            this.alert.aggregate([
                { $match: { severity: interface_1.severity.high } },
                { $group: { _id: null, highAlerts: { $sum: 1 } } },
            ]),
            this.alert.aggregate([
                { $project: { lowerType: { $toLower: "$type" } } },
                {
                    $group: {
                        _id: { $ifNull: ["$lowerType", "undefined"] },
                        count: { $sum: 1 },
                    },
                },
                { $project: { _id: 0, type: "$_id", count: 1 } },
            ]),
        ]);
        const getResult = (res, key) => res.status === "fulfilled" && res.value[0] ? res.value[0][key] : 0;
        const total = await this.alertRecord.countDocuments();
        const falsePositive = total > 0 ? (getResult(positiveFalse, "dismiss") / total) * 100 : 0;
        return {
            highRisk: getResult(highRisk, "highAlerts"),
            sarFile: getResult(SARFile, "sarfiles"),
            countries: getResult(countries, "uniqueCountries"),
            activeAlert: getResult(activeAlert, "active"),
            typeDistribution: distribution.status === "fulfilled" ? distribution.value : [],
            falsePositive,
            systemUptime: utils_1.systemUptime.inNode,
        };
    }
    async findOneProfile(query) {
        try {
            const { options, filter } = this.filterOneProfile(query);
            return (0, helpers_1.findOneWrapper)(this.profile.findOne(filter), options, "Profile").then(async (user) => {
                const transaction = await this.transaction.find({ customer: user._id });
                const recent = transaction.filter((value) => value.transactionType === "recent");
                const twoYears = transaction.filter((value) => value.transactionType === "years");
                const data = {
                    ...user,
                    recentTransaction: recent,
                    twoYearsTransaction: twoYears,
                    transaction,
                };
                return data;
            });
        }
        catch (error) {
            throw error;
        }
    }
    async topbarAnalytics() {
        try {
            const [activeAlert, highRisk, investigated] = await Promise.allSettled([
                this.alert.aggregate([
                    { $project: { lowerCaseStatus: { $toLower: "$status" } } },
                    { $match: { lowerCaseStatus: "open" } },
                    { $group: { _id: null, active: { $sum: 1 } } },
                ]),
                this.alert.aggregate([
                    { $match: { severity: interface_1.severity.high } },
                    { $group: { _id: null, highAlerts: { $sum: 1 } } },
                ]),
                this.alertRecord.aggregate([
                    { $match: { action: interface_1.Action.investigate } },
                    { $group: { _id: null, investigate: { $sum: 1 } } },
                ]),
            ]);
            const getResult = (res, key) => res.status === "fulfilled" && res.value[0] ? res.value[0][key] : 0;
            return {
                activeAlert: getResult(activeAlert, "active"),
                highRisk: getResult(highRisk, "highAlerts"),
                investigate: getResult(investigated, "investigate"),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async alertCount() {
        try {
            const [allAlert, highAlert, mediumAlert, lowAlert] = await Promise.allSettled([
                this.alert.countDocuments({}),
                this.alert.countDocuments({ severity: interface_1.severity.high }),
                this.alert.countDocuments({ severity: interface_1.severity.medium }),
                this.alert.countDocuments({ severity: interface_1.severity.low }),
            ]);
            const getResult = (res) => {
                return res.status === "fulfilled" ? res.value : 0;
            };
            return {
                all: getResult(allAlert),
                highRisk: getResult(highAlert),
                mediumAlert: getResult(mediumAlert),
                lowAlert: getResult(lowAlert),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async recentActivities() {
    }
    async findManyTransactions(query) {
        try {
            return (0, helpers_1.findManyWrapper)(this.transaction, this.filterManyTransaction(query), query);
        }
        catch (error) {
            throw error;
        }
    }
    async findManyAlerts(query) {
        try {
            return (0, helpers_1.findManyWrapper)(this.alert, this.filterManyAlert(query), query);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.MonitorService = MonitorService;
exports.MonitorService = MonitorService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("profileModel")),
    __param(1, (0, typedi_1.Inject)("alertModel")),
    __param(2, (0, typedi_1.Inject)("alertRecordModel")),
    __param(3, (0, typedi_1.Inject)("transactionModel")),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], MonitorService);
//# sourceMappingURL=monitor.service.js.map