import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { CategoriesStore } from "./store/categories.store";
import { CategoryItemComponent } from "./category-item/category-item.component";
import { CategoryModel } from "@models/category/category.model";
import { patchState } from "@ngrx/signals";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { QuizConfigFormService } from "@services/quiz/quiz-config-form.service";
import { SpinnerComponent } from "@components/spinner/spinner.component";
import { ErrorTemplateComponent } from "@components/error-template/error-template.component";

@Component({
  selector: "app-categories",
  standalone: true,
  imports: [
    SpinnerComponent,
    ErrorTemplateComponent,
    CategoryItemComponent,
    MatButtonModule,
  ],
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CategoriesComponent {
  #categoriesStore = inject(CategoriesStore);
  #quizConfigFormService = inject(QuizConfigFormService);
  #router = inject(Router);
  readonly vm = this.#categoriesStore.vm;

  handleSelectedCategory(category: CategoryModel) {
    patchState(this.#categoriesStore, { category });
    this.#quizConfigFormService.patchCategory(category);
  }

  start() {
    if (this.vm().category()) {
      this.#router.navigateByUrl("/quiz");
    }
  }
}
