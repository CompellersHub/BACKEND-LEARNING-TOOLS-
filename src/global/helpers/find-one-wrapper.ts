import * as mongoose from "mongoose";
import { FindOne } from "../entities";
import { Logger } from "./logger";
import { NotFoundError } from "routing-controllers";

const logger = new Logger("findOneWrapper");
export const findOneWrapper = async <T>(
  query: mongoose.Query<
    T & { _id: mongoose.Types.ObjectId },
    T & { _id: mongoose.Types.ObjectId }
  >,
  findOne: FindOne = {},
  model: string
): Promise<T> => {
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
        } else {
          populatePaths.push({
            path: populate,
            select: "-password",
          });
        }
      } else if (typeof populate === "object") {
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
  logger.debug(
    `Executing query for ${model}: ${JSON.stringify(query.getFilter())}`
  );
  const value = await query.exec();
  if (value) return value;
  throw new NotFoundError(model + " not found");
};
