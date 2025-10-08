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
exports.QuizService = void 0;
const helpers_1 = require("../../../global/helpers");
const mongoose_1 = require("mongoose");
const typedi_1 = require("typedi");
const routing_controllers_1 = require("routing-controllers");
let QuizService = class QuizService {
    constructor(quizModel) {
        this.quizModel = quizModel;
        this.createQuestion = async (create) => {
            try {
                const countAll = await this.quizModel.countDocuments();
                return this.quizModel.create({ ...create, quizId: countAll + 1 });
            }
            catch (error) {
                throw error;
            }
        };
        this.updateQuestion = async (update, id) => {
            try {
                const question = await this.quizModel.findById(id);
                if (!question)
                    throw new routing_controllers_1.NotFoundError("question not found");
                return this.quizModel
                    .findByIdAndUpdate(id, { ...update }, { new: true })
                    .exec();
            }
            catch (error) {
                throw error;
            }
        };
        this.findManyQuestion = async (query) => {
            try {
                return (0, helpers_1.findManyWrapper)(this.quizModel, this.filterManyQuestion(query), query);
            }
            catch (error) {
                throw error;
            }
        };
        this.findOneQuestion = async (query) => {
            try {
                const { options, filter } = this.filterOneQuestion(query);
                return (0, helpers_1.findOneWrapper)(this.quizModel.findOne(filter), options, "Quiz Model");
            }
            catch (error) {
                throw error;
            }
        };
        this.deleteQuestion = async (id) => {
            try {
                const quiz = await this.quizModel.findById(id);
                if (!quiz)
                    throw new routing_controllers_1.NotFoundError("Question not found");
                return await this.quizModel.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        };
        this.filterOneQuestion = (query) => {
            const { lean, session, increaseView, populate, select, ...filter } = query;
            const options = {
                lean: true,
                session,
                select,
                populate,
            };
            return { options, filter };
        };
        this.filterManyQuestion = (query) => {
            const filter = {};
            if (query.search) {
                filter.$or = [];
                query.search.forEach((searchTerm) => {
                    if (mongoose_1.Types.ObjectId.isValid(searchTerm)) {
                        filter.$or.push({ _id: new mongoose_1.Types.ObjectId(searchTerm) });
                    }
                    else {
                        const regx = new RegExp(searchTerm, "i");
                        filter.$or.push({ question: regx }, { explanation: regx }, { type: regx });
                    }
                });
            }
            if (query.type) {
                filter["type"] = { $in: query.type };
            }
            if (query.quizId) {
                filter["quizId"] = { $in: query.quizId };
            }
            return filter;
        };
    }
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("quizModel")),
    __metadata("design:paramtypes", [Object])
], QuizService);
//# sourceMappingURL=quiz.service.js.map