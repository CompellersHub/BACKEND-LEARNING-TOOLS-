export interface createMeasure {
  name: string;
  tableId: string;
  expression: string;
}

export type DataRow = Record<string, any>;

export type Operator =
  | "equals"
  | "not_equals"
  | "greater_than"
  | "less_than"
  | "contains"
  | "starts_with"
  | "ends_with";

export type FilterCondition<T = DataRow> = {
  field: keyof T;
  operator: Operator;
  value: any;
};

export interface filterQuery {
  field: string;
  operator: Operator;
  value: string | boolean | number;
}

export type MathOperator = "-" | "+" | "*" | "%";
