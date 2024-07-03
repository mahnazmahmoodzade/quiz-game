import { InjectionToken } from "@angular/core";
import { environment } from "@environments/environment";

export const API_PATH = new InjectionToken<string>("api.path", {
  factory: () => `${environment.apiBasePath}`,
});
