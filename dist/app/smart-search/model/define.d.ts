import { Schema } from "mongoose";
import { aiAnalysis, bioDetails, matches, newsArticles, wikipediaData } from "../interface";
export declare const newsArticlesSchema: Schema<newsArticles, import("mongoose").Model<newsArticles, any, any, any, import("mongoose").Document<unknown, any, newsArticles, any, {}> & newsArticles & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, newsArticles, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<newsArticles>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<newsArticles> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const matchesSchema: Schema<matches, import("mongoose").Model<matches, any, any, any, import("mongoose").Document<unknown, any, matches, any, {}> & matches & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, matches, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<matches>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<matches> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const wikipediaDataSchema: Schema<wikipediaData, import("mongoose").Model<wikipediaData, any, any, any, import("mongoose").Document<unknown, any, wikipediaData, any, {}> & wikipediaData & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, wikipediaData, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<wikipediaData>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<wikipediaData> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const bioDetailsSchema: Schema<bioDetails, import("mongoose").Model<bioDetails, any, any, any, import("mongoose").Document<unknown, any, bioDetails, any, {}> & bioDetails & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, bioDetails, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<bioDetails>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<bioDetails> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const aiAnalysisSchema: Schema<aiAnalysis, import("mongoose").Model<aiAnalysis, any, any, any, import("mongoose").Document<unknown, any, aiAnalysis, any, {}> & aiAnalysis & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, aiAnalysis, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<aiAnalysis>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<aiAnalysis> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
