import { JsonPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoriesStore } from "@features/categories/store/categories.store";
import { CategoryModel } from "@models/category/category.model";
import { NgSelectModule } from "@ng-select/ng-select";
import { patchState } from "@ngrx/signals";
import { QuizConfigFormService } from "@services/quiz/quiz-config-form.service";
import { DIFFICULTY } from "app/core/constants/difficulty.const";
import { QuizStore } from "../store/quiz.store";
import { debounceTime, distinctUntilChanged, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
@Component({
  selector: "app-quiz-config",
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, JsonPipe],
  templateUrl: "./quiz-config.component.html",
  styleUrl: "./quiz-config.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizConfigComponent {
  #categoriesStore = inject(CategoriesStore);
  #quizStore = inject(QuizStore);
  #destroyRef = inject(DestroyRef);
  readonly categories = this.#categoriesStore.categories;
  readonly difficulty = DIFFICULTY;
  readonly configForm = inject(QuizConfigFormService).quizConfigForm;

  configFormChanges$ = this.configForm.valueChanges
    .pipe(
      distinctUntilChanged(),
      debounceTime(100),
      tap((value) => this.#quizStore.getNextQuiz()),
      takeUntilDestroyed(this.#destroyRef),
    )
    .subscribe();

  categoryChanges(category: CategoryModel) {
    patchState(this.#categoriesStore, { category });
  }
}
