import { FilterQuery, Types } from "mongoose";
import {
  findManyAlert,
  findManyTransaction,
  findOneProfile,
  ITransactions,
  severity,
} from "../interface";

export class Define {
  filterManyTransaction(
    query: findManyTransaction
  ): FilterQuery<ITransactions> {
    const filter: FilterQuery<ITransactions> = {};

    if (query.search) {
      filter.$or = [];
      query.search.forEach((searchTerm) => {
        if (Types.ObjectId.isValid(searchTerm)) {
          filter.$or.push({ _id: new Types.ObjectId(searchTerm) });
        } else {
          const regx = new RegExp(searchTerm, "i");
          filter.$or.push({
            type: regx,
            status: regx,
            flagged: regx,
            jurisdiction: regx,
          });
        }
      });
    }

    if (query.customer) {
      filter["customer"] = { $in: query.customer };
    }

    if (query.type) {
      filter["type"] = { $in: query.type };
    }

    if (query.from && query.end) {
      const start = query.from;
      const end = query.end;
      if (start && end) {
        filter["createdAt"] = { $in: { start, end } };
      }
    }

    if (query.status) {
      filter["status"] = { $in: query.status };
    }

    return filter;
  }

  filterOneProfile(query: findOneProfile) {
    const { lean, session, increaseView, populate, select, ...filter } = query;
    const options = {
      lean: true,
      session,
      select,
      populate,
    };

    return { options, filter };
  }

  filterManyAlert(query: findManyAlert): FilterQuery<findManyAlert> {
    const filter: FilterQuery<findManyAlert> = {};

    if (query.search) {
      filter.$or = [];
      query.search.forEach((searchTerm) => {
        if (Types.ObjectId.isValid(searchTerm)) {
          filter.$or.push({ _id: new Types.ObjectId(searchTerm) });
        } else {
          const regx = new RegExp(searchTerm, "i");
          filter.$or.push({
            type: regx,
            severity: regx,
            customer: regx,
          });
        }
      });
    }

    if (query.severity) {
      const type = query.severity;
      if ([severity.high, severity.medium, severity.low].includes(type)) {
        filter["severity"] = type;
      }
    }

    return filter;
  }
}
