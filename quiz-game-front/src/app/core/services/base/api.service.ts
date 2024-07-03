import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { QueryParamsModel } from "@models/base/base.model";
import { API_PATH } from "@tokens/api-path.token";
import { queryParamsGenerator } from "@utilities/query-params-generator";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ApiService {
  readonly #http = inject(HttpClient);
  readonly #apiBasePath = inject(API_PATH);

  get<T>(url: string, params?: QueryParamsModel): Observable<T> {
    const queryParams = queryParamsGenerator(params ?? {});
    return this.#http.get<T>(`${this.#apiBasePath}${url}?${queryParams}`);
  }

  post<T, D>(url: string, data?: D): Observable<T> {
    console.log("data", data);
    return this.#http.post<T>(`${this.#apiBasePath}${url}`, data);
  }

  put<T, D>(url: string, data: D): Observable<T> {
    return this.#http.put<T>(`${this.#apiBasePath}${url}`, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.#http.delete<T>(`${this.#apiBasePath}${url}`);
  }
}
