import { Injectable, inject } from "@angular/core";
import { CategoryModel } from "@models/category/category.model";
import { ApiService } from "@services/base/api.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CategoryService {
  #apiService = inject(ApiService);
  readonly #categoryBasePath = "/categories";

  getCategories(): Observable<CategoryModel[]> {
    return this.#apiService.get(this.#categoryBasePath);
  }
}
