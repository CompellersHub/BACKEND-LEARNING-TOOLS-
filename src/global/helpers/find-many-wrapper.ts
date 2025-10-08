import {
  FilterQuery,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
  PopulateOptions,
} from "mongoose";
import { Logger } from "./logger";
import { FindMany } from "../entities";

interface ExtendedPaginateOptions extends Omit<PaginateOptions, "lean"> {
  lean?:
    | boolean
    | {
        virtuals?: boolean;
        transform?: <
          T extends { password?: unknown; _id?: { toString(): string } }
        >(
          doc: T
        ) => T;
      };
}

const logger = new Logger("findManyWrapper");
export const findManyWrapper = <T>(
  model: PaginateModel<T>,
  condition: FilterQuery<T>,
  findMany: FindMany
): Promise<PaginateResult<T>> => {
  const { offset, sort, limit, page, select, lean } = findMany;

  // Extend PaginateOptions to allow lean as boolean or object
  // const options: PaginateOptions & { lean?: boolean | Record<string, unknown> } = {};
  const options: ExtendedPaginateOptions = {};

  // Handle sorting
  if (sort) {
    const sortPairs = Array.isArray(sort) ? sort : [sort];
    const sortObject: Record<string, number> = {};
    sortPairs.forEach((pair) => {
      const [key, value] = pair.split(",");
      sortObject[key] = Number(value ? value : -1);
    });
    options["sort"] = sortObject;
    options["collation"] = { locale: "en" };
  }

  // Modify select to exclude password
  const passwordExcludedSelect =
    select && Array.isArray(select)
      ? `${select.join(" ")} -password`
      : "-password";
  if (select || select === undefined) {
    options.select = passwordExcludedSelect;
  }

  // Handle populates with password exclusion
  let populates = findMany.populate;
  if (populates && populates.length > 0) {
    const populatePaths: PopulateOptions[] = [];
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
                  select: `${select.substring(
                    select.indexOf(".") + 1
                  )} -password`,
                }
              : {
                  path: select,
                  select: "-password",
                },
          });
        } else {
          populatePaths.push({
            path: populate,
            select: "-password",
          });
        }
      } else {
        // If populate is an object, ensure it excludes password
        const populateObject: PopulateOptions = {
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

  // Set other options
  if (offset) options.offset = offset;
  if (limit) options.limit = limit;
  if (page) options.page = page;

  // Modify lean option to handle type issues
  if (lean) {
    options.lean =
      typeof lean === "object"
        ? {
            virtuals: true,
            transform: <
              D extends { password?: unknown; _id?: { toString(): string } }
            >(
              doc: D
            ): D => {
              // Remove password
              if ("password" in doc) {
                delete doc.password;
              }

              // Convert _id to string
              if (doc._id && typeof doc._id.toString === "function") {
                doc._id = doc._id.toString() as unknown as D["_id"];
              }

              // Recursively process nested documents
              const processDoc = <O>(obj: O): O => {
                if (Array.isArray(obj)) {
                  return obj.map(processDoc) as unknown as O;
                }

                if (obj && typeof obj === "object") {
                  // Remove password from nested objects
                  if ("password" in obj) {
                    delete (obj as { password?: unknown }).password;
                  }

                  // Convert _id to string in nested objects
                  if (
                    "_id" in obj &&
                    obj["_id"] &&
                    typeof (obj["_id"] as { toString?: () => string })
                      .toString === "function"
                  ) {
                    obj["_id"] = (
                      obj["_id"] as { toString: () => string }
                    ).toString() as unknown as O;
                  }

                  // Recursively process nested objects
                  Object.keys(obj).forEach((key) => {
                    const value = (obj as Record<string, unknown>)[key];
                    if (value && typeof value === "object") {
                      (obj as Record<string, unknown>)[key] = processDoc(value);
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

  return model.paginate(condition, options as PaginateOptions);
};
