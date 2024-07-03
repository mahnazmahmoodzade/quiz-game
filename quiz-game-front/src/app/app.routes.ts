import { Routes } from "@angular/router";
import { MainComponent } from "@layout/main/main.component";
import { AuthenticationGuard } from "@guards/authentication.guard";
import { CategoriesStore } from "@features/categories/store/categories.store";
import { QuizConfigFormService } from "@services/quiz/quiz-config-form.service";
import { CategoryGuard } from "@guards/category.guard";

export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    canActivate: [AuthenticationGuard],
    providers: [CategoriesStore, QuizConfigFormService],
    children: [
      {
        path: "",
        redirectTo: "categories",
        pathMatch: "full",
      },
      {
        path: "categories",
        loadComponent: async () =>
          await import("./features/categories/categories.component"),
      },
      {
        path: "quiz",
        canActivate: [CategoryGuard],
        loadComponent: async () =>
          await import("./features/quiz/quiz.component"),
      },
    ],
  },
  {
    path: "login",
    loadComponent: async () =>
      await import("./authentication/login/login.component"),
  },
  {
    path: "**",
    redirectTo: "/",
    pathMatch: "full",
  },
];
