import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { CategoriesStore } from "@features/categories/store/categories.store";

export const CategoryGuard: CanActivateFn = () => {
  const hasCategory = inject(CategoriesStore).selectedCategory;
  const router = inject(Router); 
  if (hasCategory()) {
    return true;
  }
  router.navigateByUrl("categories");
  return false;
};
