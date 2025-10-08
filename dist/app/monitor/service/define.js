"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Define = void 0;
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
class Define {
    filterManyTransaction(query) {
        const filter = {};
        if (query.search) {
            filter.$or = [];
            query.search.forEach((searchTerm) => {
                if (mongoose_1.Types.ObjectId.isValid(searchTerm)) {
                    filter.$or.push({ _id: new mongoose_1.Types.ObjectId(searchTerm) });
                }
                else {
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
    filterOneProfile(query) {
        const { lean, session, increaseView, populate, select, ...filter } = query;
        const options = {
            lean: true,
            session,
            select,
            populate,
        };
        return { options, filter };
    }
    filterManyAlert(query) {
        const filter = {};
        if (query.search) {
            filter.$or = [];
            query.search.forEach((searchTerm) => {
                if (mongoose_1.Types.ObjectId.isValid(searchTerm)) {
                    filter.$or.push({ _id: new mongoose_1.Types.ObjectId(searchTerm) });
                }
                else {
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
            if ([interface_1.severity.high, interface_1.severity.medium, interface_1.severity.low].includes(type)) {
                filter["severity"] = type;
            }
        }
        return filter;
    }
}
exports.Define = Define;
//# sourceMappingURL=define.js.map