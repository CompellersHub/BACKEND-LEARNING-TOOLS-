import { findManyWrapper, findOneWrapper } from "@/global/helpers";
import { FilterQuery, PaginateResult, Types } from "mongoose";
import { Inject, Service } from "typedi";
import {
  createQuestion,
  findManyQuestion,
  findOneQuestion,
  IQuestion,
  updateQuestion,
} from "../interface";
import { QuizDocument, QuizModel } from "../model";
import { NotFoundError } from "routing-controllers";

@Service()
export class QuizService {
  constructor(
    @Inject("quizModel") private readonly quizModel: typeof QuizModel
  ) {}

  public createQuestion = async (
    create: createQuestion
  ): Promise<IQuestion> => {
    try {
      const countAll = await this.quizModel.countDocuments();
      return this.quizModel.create({ ...create, quizId: countAll + 1 });
    } catch (error) {
      throw error;
    }
  };

  public updateQuestion = async (
    update: updateQuestion,
    id: string
  ): Promise<IQuestion> => {
    try {
      const question = await this.quizModel.findById(id);
      if (!question) throw new NotFoundError("question not found");

      return this.quizModel
        .findByIdAndUpdate(id, { ...update }, { new: true })
        .exec();
    } catch (error) {
      throw error;
    }
  };

  public findManyQuestion = async (
    query: findManyQuestion
  ): Promise<PaginateResult<IQuestion>> => {
    try {
      return findManyWrapper<IQuestion>(
        this.quizModel,
        this.filterManyQuestion(query),
        query
      );
    } catch (error) {
      throw error;
    }
  };

  public findOneQuestion = async (
    query: FilterQuery<IQuestion>
  ): Promise<IQuestion> => {
    try {
      const { options, filter } = this.filterOneQuestion(query);
      return findOneWrapper(
        this.quizModel.findOne(filter),
        options,
        "Quiz Model"
      );
    } catch (error) {
      throw error;
    }
  };

  public deleteQuestion = async (id: string) => {
    try {
      const quiz = await this.quizModel.findById(id);
      if (!quiz) throw new NotFoundError("Question not found");
      return await this.quizModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  };

  private filterOneQuestion = (query: findOneQuestion) => {
    const { lean, session, increaseView, populate, select, ...filter } = query;
    const options = {
      lean: true,
      session,
      select,
      populate,
    };

    return { options, filter };
  };

  private filterManyQuestion = (
    query: findManyQuestion
  ): FilterQuery<QuizDocument> => {
    const filter: FilterQuery<IQuestion> = {};

    if (query.search) {
      filter.$or = [];
      query.search.forEach((searchTerm) => {
        if (Types.ObjectId.isValid(searchTerm)) {
          filter.$or.push({ _id: new Types.ObjectId(searchTerm) });
        } else {
          const regx = new RegExp(searchTerm, "i");
          filter.$or.push(
            { question: regx },
            { explanation: regx },
            { type: regx }
          );
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
