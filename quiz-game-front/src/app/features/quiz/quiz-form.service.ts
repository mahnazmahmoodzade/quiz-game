import { Injectable, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable()
export class QuizFormService {
  #fb = inject(FormBuilder);

  #form: FormGroup = this.#fb.group({
    questionId: [""],
    answer: ["", Validators.required],
  });

  get quizForm(): FormGroup {
    return this.#form;
  }

  patchQuestionId(questionId: string) {
    this.#form.patchValue({
      questionId,
    });
  }

  resetForm() {
    this.#form.reset();
  }
}
