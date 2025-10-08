import { findManyWrapper, findOneWrapper } from "@/global/helpers";
import { systemUptime } from "@/global/utils";
import { FilterQuery, PaginateResult } from "mongoose";
import { NotFoundError } from "routing-controllers";
import { Inject, Service } from "typedi";
import {
  Action,
  Alert,
  AlertRecords,
  createAlert,
  findManyAlert,
  findManyTransaction,
  IProfile,
  ITransactions,
  profileResponse,
  severity,
} from "../interface";
import {
  AlertModel,
  AlertRecordModel,
  ProfileDocument,
  ProfileModel,
  TransactionModel,
} from "../model";
import { Define } from "./define";

@Service()
export class MonitorService extends Define {
  constructor(
    @Inject("profileModel") private readonly profile: typeof ProfileModel,
    @Inject("alertModel") private readonly alert: typeof AlertModel,
    @Inject("alertRecordModel")
    private readonly alertRecord: typeof AlertRecordModel,
    @Inject("transactionModel")
    private readonly transaction: typeof TransactionModel
  ) {
    super();
  }

  async submitReviewAlert(data: createAlert): Promise<AlertRecords> {
    try {
      const findAlert = await this.alert.findById(data.alert);
      if (!findAlert) {
        throw new NotFoundError("Alert not found");
      }

      return this.alertRecord.create(data);
    } catch (error) {
      throw error;
    }
  }

  async analyticsDashboard() {
    const [
      activeAlert,
      SARFile,
      positiveFalse,
      countries,
      highRisk,
      distribution,
    ] = await Promise.allSettled([
      // Open alerts
      this.alert.aggregate([
        { $project: { lowerCaseStatus: { $toLower: "$status" } } },
        { $match: { lowerCaseStatus: "open" } },
        { $group: { _id: null, active: { $sum: 1 } } },
      ]),

      // SAR Files
      this.alertRecord.aggregate([
        { $match: { action: Action.file } },
        { $group: { _id: null, sarfiles: { $sum: 1 } } },
      ]),

      // SAR Positive false
      this.alertRecord.aggregate([
        { $match: { action: Action.dismiss } },
        { $group: { _id: null, dismiss: { $sum: 1 } } },
      ]),

      // Countries
      this.alert.aggregate([
        { $project: { lowerCaseCountry: { $toLower: "$geoLocation" } } },
        { $group: { _id: "$lowerCaseCountry" } },
        { $count: "uniqueCountries" },
      ]),

      // High Risk Alerts
      this.alert.aggregate([
        { $match: { severity: severity.high } },
        { $group: { _id: null, highAlerts: { $sum: 1 } } },
      ]),

      // Distribution
      this.alert.aggregate([
        { $project: { lowerType: { $toLower: "$type" } } },
        {
          $group: {
            _id: { $ifNull: ["$lowerType", "undefined"] },
            count: { $sum: 1 },
          },
        },
        { $project: { _id: 0, type: "$_id", count: 1 } },
      ]),
    ]);

    const getResult = (res: PromiseSettledResult<any[]>, key: string) =>
      res.status === "fulfilled" && res.value[0] ? res.value[0][key] : 0;

    const total = await this.alertRecord.countDocuments();
    const falsePositive =
      total > 0 ? (getResult(positiveFalse, "dismiss") / total) * 100 : 0;

    return {
      highRisk: getResult(highRisk, "highAlerts"),
      sarFile: getResult(SARFile, "sarfiles"),
      countries: getResult(countries, "uniqueCountries"),
      activeAlert: getResult(activeAlert, "active"),
      typeDistribution:
        distribution.status === "fulfilled" ? distribution.value : [],
      falsePositive,
      systemUptime: systemUptime.inNode,
    };
  }

  async findOneProfile(
    query: FilterQuery<ProfileDocument>
  ): Promise<profileResponse> {
    try {
      const { options, filter } = this.filterOneProfile(query);
      return findOneWrapper(
        this.profile.findOne(filter),
        options,
        "Profile"
      ).then(async (user) => {
        const transaction = await this.transaction.find({ customer: user._id });
        const recent = transaction.filter(
          (value) => value.transactionType === "recent"
        );
        const twoYears = transaction.filter(
          (value) => value.transactionType === "years"
        );

        const data = {
          ...user,
          recentTransaction: recent,
          twoYearsTransaction: twoYears,
          transaction,
        };

        // console.log(data);
        return data;
      });
    } catch (error) {
      throw error;
    }
  }

  async topbarAnalytics() {
    try {
      const [activeAlert, highRisk, investigated] = await Promise.allSettled([
        // Open alerts
        this.alert.aggregate([
          { $project: { lowerCaseStatus: { $toLower: "$status" } } },
          { $match: { lowerCaseStatus: "open" } },
          { $group: { _id: null, active: { $sum: 1 } } },
        ]),

        // High Risk Alerts
        this.alert.aggregate([
          { $match: { severity: severity.high } },
          { $group: { _id: null, highAlerts: { $sum: 1 } } },
        ]),

        // SAR Files
        this.alertRecord.aggregate([
          { $match: { action: Action.investigate } },
          { $group: { _id: null, investigate: { $sum: 1 } } },
        ]),
      ]);

      const getResult = (res: PromiseSettledResult<any[]>, key: string) =>
        res.status === "fulfilled" && res.value[0] ? res.value[0][key] : 0;

      return {
        activeAlert: getResult(activeAlert, "active"),
        highRisk: getResult(highRisk, "highAlerts"),
        investigate: getResult(investigated, "investigate"),
      };
    } catch (error) {
      throw error;
    }
  }

  async alertCount() {
    try {
      const [allAlert, highAlert, mediumAlert, lowAlert] =
        await Promise.allSettled([
          this.alert.countDocuments({}),
          this.alert.countDocuments({ severity: severity.high }),
          this.alert.countDocuments({ severity: severity.medium }),
          this.alert.countDocuments({ severity: severity.low }),
        ]);

      const getResult = (res: PromiseSettledResult<number>) => {
        return res.status === "fulfilled" ? res.value : 0;
      };

      return {
        all: getResult(allAlert),
        highRisk: getResult(highAlert),
        mediumAlert: getResult(mediumAlert),
        lowAlert: getResult(lowAlert),
      };
    } catch (error) {
      throw error;
    }
  }

  async recentActivities() {
    // all recently submitted files
  }

  async findManyTransactions(
    query: findManyTransaction
  ): Promise<PaginateResult<ITransactions>> {
    try {
      return findManyWrapper<ITransactions>(
        this.transaction,
        this.filterManyTransaction(query),
        query
      );
    } catch (error) {
      throw error;
    }
  }

  async findManyAlerts(query: findManyAlert): Promise<PaginateResult<Alert>> {
    try {
      return findManyWrapper<Alert>(
        this.alert,
        this.filterManyAlert(query),
        query
      );
    } catch (error) {
      throw error;
    }
  }

  // async generateProfile() {
  //   try {
  //     const users = await this.profile.find();

  //     users.forEach(async (u) => {
  //       const [recent, years] = await Promise.all([
  //         this.transaction.insertMany(generateCustomerHistory(30, u._id)),
  //         this.transaction.insertMany(generateTwoYearHistory(u._id)),
  //       ]);

  //       console.log(recent, years);
  //     });

  //     return users;
  //     // const user: { name: string; id: Types.ObjectId }[] = [];
  //     // const names: string[] = [];

  //     // for (const u of users) {
  //     //   user.push({ name: u.fullName, id: u._id });
  //     //   names.push(u.fullName);
  //     // }

  //     // const save = generateMockAlerts(10000, user, names);
  //     // await this.alert.insertMany(save);

  //     // return users;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
