import { Injectable, inject } from "@angular/core";
import { AuthResponseModel } from "@models/base/auth.model";
import { ApiService } from "@services/base/api.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  #apiService = inject(ApiService);
  readonly #authPath = "/authentication";

  login(accessCode: string): Observable<AuthResponseModel> {
    return this.#apiService.post(`${this.#authPath}/login`, { accessCode });
  }
}
