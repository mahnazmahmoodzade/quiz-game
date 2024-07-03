import { HttpErrorResponse } from "@angular/common/http";
import { computed, inject } from "@angular/core";
import { CategoryModel } from "@models/category/category.model";
import { tapResponse } from "@ngrx/operators";
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { CategoryService } from "@services/category/category.service";
import {
  setError,
  setFulfilled,
  setPending,
  withRequestState,
} from "@state/request-state.feature";
import { pipe, switchMap, tap } from "rxjs";

interface CategoriesStateModel {
  categories: CategoryModel[];
  category: CategoryModel | null;
}

const initialState: CategoriesStateModel = {
  categories: [],
  category: null,
};

export const CategoriesStore = signalStore(
  withState(initialState),
  withRequestState({ prefix: "categories" }),
  withComputed((store) => ({
    vm: computed(() => store),
    selectedCategory: computed(() => store.category()),
  })),
  withMethods((store, categoriesService = inject(CategoryService)) => ({
    getCategories: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending("categories"))),
        switchMap(() =>
          categoriesService.getCategories().pipe(
            tapResponse({
              next: (categories) =>
                patchState(store, setFulfilled("categories"), { categories }),
              error: ({ error }: HttpErrorResponse) =>
                patchState(store, setError("categories", error)),
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.getCategories();
    },
  }),
);
