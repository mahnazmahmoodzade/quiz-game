export type RequestStatusType = "idle" | "pending" | "fulfilled" | "error";

export type ParamsValueModel = string | string[] | number | number[] | boolean;
export type QueryParamsModel = Record<string, ParamsValueModel>;
