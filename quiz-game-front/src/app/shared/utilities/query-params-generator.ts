import { HttpParams } from "@angular/common/http";
import { QueryParamsModel } from "@models/base/base.model";

export function queryParamsGenerator(formValue: QueryParamsModel): string {
  if (!Object.values(formValue).length) return "";
  const filteredValue = Object.keys(formValue)
    .filter((key) => formValue[key])
    .reduce((obj: QueryParamsModel, key) => {
      obj[key] = formValue[key];
      return obj;
    }, {});
  const params = new HttpParams({ fromObject: filteredValue });
  return params.toString();
}
