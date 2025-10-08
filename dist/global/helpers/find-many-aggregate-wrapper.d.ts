import { PaginateModel, PipelineStage } from "mongoose";
import { FindMany, PaginateResult } from "../entities";
export declare const findManyAggregateWrapper: <T>(model: PaginateModel<any>, stages: PipelineStage.FacetPipelineStage[], q: FindMany, projection?: Record<string, 0 | 1 | any>, transformFn?: (docs: any) => T[]) => Promise<PaginateResult<T>>;
