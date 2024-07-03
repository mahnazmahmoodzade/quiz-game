import { Injectable, inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CategoryModel } from "@models/category/category.model";

@Injectable()
export class QuizConfigFormService {
  #fb = inject(FormBuilder);

  #form: FormGroup = this.#fb.group({
    categoryId: [null],
    difficulty: ["easy"],
  });

  get quizConfigForm(): FormGroup {
    return this.#form;
  }

  patchCategory(category: CategoryModel) {
    this.#form.patchValue({
      categoryId: category.id,
    });
  }
}
