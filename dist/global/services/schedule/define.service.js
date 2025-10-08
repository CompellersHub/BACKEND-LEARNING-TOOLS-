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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const typedi_1 = require("typedi");
const agenda_1 = require("./agenda");
const schedule_interface_1 = require("./schedule.interface");
const kyc_service_1 = require("../../../app/kyc-training-portal/kyc.service");
let ScheduleService = class ScheduleService {
    constructor(kycService) {
        this.kycService = kycService;
        this.defineJobs();
    }
    defineJobs() {
        agenda_1.agenda.define(schedule_interface_1.Jobs.kyc, async (job) => {
            const { body, files, caseId } = job.attrs.data;
            await this.kycService.kycScheduleCreate(body, files, caseId);
        });
    }
};
exports.ScheduleService = ScheduleService;
exports.ScheduleService = ScheduleService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [kyc_service_1.KycTrainingPortalService])
], ScheduleService);
//# sourceMappingURL=define.service.js.map