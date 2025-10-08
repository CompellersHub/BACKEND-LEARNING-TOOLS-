"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneWrapper = void 0;
const logger_1 = require("./logger");
const routing_controllers_1 = require("routing-controllers");
const logger = new logger_1.Logger("findOneWrapper");
const findOneWrapper = async (query, findOne = {}, model) => {
    const { select, session, lean } = findOne;
    query.select(select);
    query.session(session);
    let populates = findOne.populate;
    if (populates && populates.length > 0) {
        const populatePaths = [];
        populates = Array.isArray(populates) ? populates : [populates];
        populates.forEach((populate) => {
            if (typeof populate === "string") {
                if (populate.includes(".")) {
                    const path = populate.substring(0, populate.indexOf("."));
                    const select = populate.substring(populate.indexOf(".") + 1);
                    populatePaths.push({
                        path,
                        select: select.includes(".")
                            ? select.substring(0, select.indexOf("."))
                            : select,
                        populate: select.includes(".")
                            ? {
                                path: select.substring(0, select.indexOf(".")),
                                select: select.substring(select.indexOf(".") + 1),
                            }
                            : { path: select },
                    });
                }
                else {
                    populatePaths.push({
                        path: populate,
                        select: "-password",
                    });
                }
            }
            else if (typeof populate === "object") {
                populatePaths.push({
                    ...populate,
                    select: populate.select
                        ? `${populate.select} -password`
                        : "-password",
                });
            }
        });
        query.populate(populatePaths);
    }
    if (lean) {
        query.lean();
    }
    logger.debug(`Executing query for ${model}: ${JSON.stringify(query.getFilter())}`);
    const value = await query.exec();
    if (value)
        return value;
    throw new routing_controllers_1.NotFoundError(model + " not found");
};
exports.findOneWrapper = findOneWrapper;
//# sourceMappingURL=find-one-wrapper.js.map