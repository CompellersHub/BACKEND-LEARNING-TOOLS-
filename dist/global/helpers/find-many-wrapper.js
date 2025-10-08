"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findManyWrapper = void 0;
const logger_1 = require("./logger");
const logger = new logger_1.Logger("findManyWrapper");
const findManyWrapper = (model, condition, findMany) => {
    const { offset, sort, limit, page, select, lean } = findMany;
    const options = {};
    if (sort) {
        const sortPairs = Array.isArray(sort) ? sort : [sort];
        const sortObject = {};
        sortPairs.forEach((pair) => {
            const [key, value] = pair.split(",");
            sortObject[key] = Number(value ? value : -1);
        });
        options["sort"] = sortObject;
        options["collation"] = { locale: "en" };
    }
    const passwordExcludedSelect = select && Array.isArray(select)
        ? `${select.join(" ")} -password`
        : "-password";
    if (select || select === undefined) {
        options.select = passwordExcludedSelect;
    }
    let populates = findMany.populate;
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
                            ? `${select.substring(0, select.indexOf("."))} -password`
                            : `${select} -password`,
                        populate: select.includes(".")
                            ? {
                                path: select.substring(0, select.indexOf(".")),
                                select: `${select.substring(select.indexOf(".") + 1)} -password`,
                            }
                            : {
                                path: select,
                                select: "-password",
                            },
                    });
                }
                else {
                    populatePaths.push({
                        path: populate,
                        select: "-password",
                    });
                }
            }
            else {
                const populateObject = {
                    ...populate,
                    select: populate.select
                        ? `${populate.select} -password`
                        : "-password",
                };
                populatePaths.push(populateObject);
            }
        });
        options["populate"] = populatePaths;
    }
    if (offset)
        options.offset = offset;
    if (limit)
        options.limit = limit;
    if (page)
        options.page = page;
    if (lean) {
        options.lean =
            typeof lean === "object"
                ? {
                    virtuals: true,
                    transform: (doc) => {
                        if ("password" in doc) {
                            delete doc.password;
                        }
                        if (doc._id && typeof doc._id.toString === "function") {
                            doc._id = doc._id.toString();
                        }
                        const processDoc = (obj) => {
                            if (Array.isArray(obj)) {
                                return obj.map(processDoc);
                            }
                            if (obj && typeof obj === "object") {
                                if ("password" in obj) {
                                    delete obj.password;
                                }
                                if ("_id" in obj &&
                                    obj["_id"] &&
                                    typeof obj["_id"]
                                        .toString === "function") {
                                    obj["_id"] = obj["_id"].toString();
                                }
                                Object.keys(obj).forEach((key) => {
                                    const value = obj[key];
                                    if (value && typeof value === "object") {
                                        obj[key] = processDoc(value);
                                    }
                                });
                            }
                            return obj;
                        };
                        return processDoc(doc);
                    },
                }
                : lean;
    }
    logger.debug(`Executing query ${JSON.stringify({ condition, options })}`);
    return model.paginate(condition, options);
};
exports.findManyWrapper = findManyWrapper;
//# sourceMappingURL=find-many-wrapper.js.map