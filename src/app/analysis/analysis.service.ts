import { uploadFile } from "@/global/entities";
import path from "path";
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from "routing-controllers";
import { Service } from "typedi";
import { v4 as uuidv4 } from "uuid";
import { connectDB, createMeasure, filterQuery } from "./interface";
import {
  DatabaseManager,
  DataTransformer,
  DAXEngine,
  FileProcessor,
} from "./tools";
const dataSources = new Map<string, any>();

@Service()
export class AnalysisToolServices {
  constructor(
    private readonly fileProcessor: FileProcessor,
    private readonly database: DatabaseManager,
    private readonly daxEngine: DAXEngine,
    private readonly transform: DataTransformer
  ) {}

  async uploadFile(file: uploadFile, user?: { id: string }) {
    try {
      const joinName = this.joinName(file.originalname);
      const fileExtension = path.extname(joinName).slice(1);
      const processedData = await this.fileProcessor.processFile(
        file.buffer,
        fileExtension
      );

      const dataSourceId = uuidv4();
      const dataSource = {
        id: dataSourceId,
        name: joinName,
        type: "file",
        fileType: fileExtension,
        filePath: file.path,
        data: processedData?.data,
        userId: "12345",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dataSources.set(dataSourceId, dataSource);
      const result = {
        dataSourceId,
        name: dataSource.name,
        type: dataSource.type,
        data: this.transformDataDynamic(processedData.data[0]),
        fileType: dataSource.fileType,
        metadata: processedData?.metadata,
      };

      return result;
    } catch (error) {
      throw error;
    }
  }

  async connectDatabase(data: connectDB, user: { id: string }) {
    const { type, config, name } = data;
    try {
      const connectionId = await this.database.createConnection(
        type,
        config[type]
      );

      const dataSourceId = uuidv4();
      const dataSource = {
        id: dataSourceId,
        name: name || `${type}_connection`,
        type: "database",
        databaseType: type,
        connectionId,
        config: { ...config, password: undefined }, // Remove password for security
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      dataSources.set(dataSourceId, dataSource);

      const result = {
        dataSourceId,
        name: dataSource.name,
        type: dataSource.type,
        databaseType: dataSource.databaseType,
      };

      return result;
    } catch (error) {
      throw error;
    }
  }

  async findAll(user: { id: string }) {
    try {
      const userDataSources = Array.from(dataSources.values())
        .filter((ds) => ds.userId === user.id)
        .map((ds) => {
          const tran = this.transformDataDynamic(ds.data[0]);
          return {
            id: ds.id,
            name: ds.name,
            type: ds.type,
            userId: user,
            fileType: ds.fileType,
            databaseType: ds.databaseType,
            data: tran, //remove the data so the client can render it
            createdAt: ds.createdAt,
            updatedAt: ds.updatedAt,
          };
        });
      return userDataSources;
    } catch (error) {
      throw error;
    }
  }

  async searchColumn(data: { id: string; search: string }) {
    const { id, search } = data;
    const dataSource = dataSources.get(id);
    const source = dataSource.data;
    console.log(source);
    if (!dataSource || !Array.isArray(source)) {
      throw new NotFoundError("Data source not found or invalid");
    }

    if (source.length === 0) {
      return []; // No data, no columns
    }

    const columns = Object.keys(source[0] || {});
    return columns.filter((col) => {
      console.log(col);
      return col.toLowerCase().includes(search.toLowerCase());
    });
  }

  async createRelationship(data: {
    modelId: string; //the data the user is working with id
    from: string;
    to: string;
    relationshipType: "one-to-many" | "one-to-one" | "many-to-many";
  }) {
    const { from, to, relationshipType } = data;

    // get the from id and the to id and the type of relationship

    // const fromDataSource = dataSources.get(from);
    // const toDataSource = dataSources.get(to);
    // if (!fromDataSource || !toDataSource) {
    //   throw new NotFoundError("Data source not found");
    // }
    // const fromData = fromDataSource.data;
    // const toData = toDataSource.data;
    // if (!Array.isArray(fromData) || !Array.isArray(toData)) {
    //   throw new NotFoundError("Data source is not an array");
    // }
    // const relationships = fromData.map((row) => {
    //   const relatedRows = toData.filter((relatedRow) => {
    //     return relatedRow[relationship] === row[relationship];
    //   })
    // })
  }

  async createMeasure(data: createMeasure) {
    const parsed = this.daxEngine.parseExpression(data.expression);
    if (!parsed) throw new ForbiddenError("Invalid expression format");

    const dataSource = dataSources.get(data.tableId);

    // if (!dataSource || dataSource.userId !== user.id) {
    //   throw new NotFoundError("Data source not found");
    // }

    const results = dataSource.data.map((item) =>
      this.daxEngine.computeExpression(
        item,
        parsed.leftField,
        parsed.operator,
        parsed.rightField
      )
    );

    const total = results.reduce((sum: number, val: number) => sum + val, 0);
    return { [data.name]: total, results };
  }

  async filterQuery(id: string, value: filterQuery[]) {
    const { data } = await this.findOne({ id }, { id: "12345" });

    return this.transform.filterRows(data, value);
  }

  async findOne(params: { id: string }, user: { id: string }) {
    try {
      const dataSource = dataSources.get(params.id);

      if (!dataSource || dataSource.userId !== user.id) {
        throw new NotFoundError("Data source not found");
      }

      return dataSource;
    } catch (error) {
      throw error;
    }
  }

  async executeQueryOnDatabase(
    data: { query: any; params: { id: string } },
    user: { id: string }
  ) {
    try {
      const { query, params } = data;
      const dataSource = dataSources.get(params.id);

      if (!dataSource || dataSource.userId !== user.id) {
        throw new NotFoundError("Data source not found");
      }

      if (dataSource.type !== "database") {
        throw new UnauthorizedError(
          "Query only supported for database sources"
        );
      }

      const result = await this.database.executeQuery(
        dataSource.connectionId,
        query,
        params
      );
      return { data: result };
    } catch (error) {
      throw error;
    }
  }

  private transformDataDynamic = (data: Record<string, string>) => {
    return Object.entries(data).map(([key, value]) => {
      const cleanKey = key.replace("?", "");
      return {
        columnName: cleanKey,
        dataType: typeof value,
        nullable: "yes",
        constraints: "",
      };
    });
  };
  private joinName(name: string): string {
    return name.replace(/\s+/g, "-").toLowerCase();
  }
}
