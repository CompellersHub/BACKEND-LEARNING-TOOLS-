"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findManyAggregateWrapper = void 0;
const logger_1 = require("./logger");
const logger = new logger_1.Logger("findManyAggregateWrapper");
const findManyAggregateWrapper = async (model, stages, q, projection, transformFn) => {
    try {
        const sortStage = {};
        if (q.sort && Array.isArray(q.sort)) {
            q.sort.forEach((field) => {
                const sortField = field.split(",");
                if (sortField.length === 2) {
                    sortStage[sortField[0]] = Number(sortField[1]);
                }
                else {
                    sortStage[field] = 1;
                }
            });
        }
        const [res] = await model.aggregate([
            {
                $facet: {
                    paginate: [
                        ...stages,
                        { $project: projection ?? {} },
                        { $count: "totalDoc" },
                    ],
                    docs: [
                        ...stages,
                        { $project: projection ?? {} },
                        { $sort: sortStage },
                        { $skip: (q.page - 1) * q.limit },
                        { $limit: q.limit },
                    ],
                },
            },
        ]);
        const totalDocs = res.paginate.reduce((i, c) => i + (c.totalDoc || 0), 0);
        const totalPages = Math.ceil(totalDocs / (q.limit || 10));
        let { docs: docs_1 } = res;
        if (transformFn)
            docs_1 = transformFn(docs_1);
        console.log(`Executing query ${JSON.stringify({ stages })}`);
        return {
            docs: docs_1,
            page: q.page,
            limit: q.limit,
            offset: undefined,
            pagingCounter: (q.page - 1) * q.limit + 1,
            totalPages,
            nextPage: q.page + 1 <= totalPages ? q.page + 1 : null,
            hasNextPage: q.page < totalPages,
            prevPage: q.page - 1 > 0 ? q.page - 1 : null,
            hasPrevPage: q.page - 1 > 0,
            totalDocs,
        };
    }
    catch (error) {
        logger.error("Error in findManyAggregateWrapper:", error);
        throw error;
    }
};
exports.findManyAggregateWrapper = findManyAggregateWrapper;
//# sourceMappingURL=find-many-aggregate-wrapper.js.map