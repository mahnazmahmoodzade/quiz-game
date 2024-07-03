import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { QuizConfigComponent } from "./quiz-config/quiz-config.component";
import { QuizStore } from "./store/quiz.store";
import { SpinnerComponent } from "@components/spinner/spinner.component";
import { ErrorTemplateComponent } from "@components/error-template/error-template.component";
import { QuizFormService } from "./quiz-form.service";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonLoadingComponent } from "@components/button-loading/button-loading.component";
import { QuizStateComponent } from "./quiz-state/quiz-state.component";
import { SafePipe } from "app/shared/pipes/safe.pipe";
import { QuizFinishedComponent } from "./quiz-finished/quiz-finished.component";

@Component({
  selector: "app-quiz",
  standalone: true,
  imports: [
    QuizConfigComponent,
    SpinnerComponent,
    ErrorTemplateComponent,
    ReactiveFormsModule,
    ButtonLoadingComponent,
    QuizStateComponent,
    QuizFinishedComponent,
    SafePipe,
  ],
  templateUrl: "./quiz.component.html",
  styleUrl: "./quiz.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [QuizStore, QuizFormService],
})
export default class QuizComponent {
  #quizStore = inject(QuizStore);
  #quizFormService = inject(QuizFormService);
  readonly vm = this.#quizStore.vm;
  readonly quizForm = this.#quizFormService.quizForm;

  submitAnswer() {
    this.#quizStore.submitAnswer();
  }
}
