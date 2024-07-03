import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";
import { QuizAnswerResponseModel } from "@models/quiz/quiz.model";

@Component({
  selector: "app-quiz-state",
  standalone: true,
  templateUrl: "./quiz-state.component.html",
  styleUrl: "./quiz-state.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizStateComponent {
  answer = input.required<QuizAnswerResponseModel>();
  progress = computed(() => {
    const totalPossibleScore = this.answer().totalQuestions * 1;
    const percentage = (this.answer().currentScore / totalPossibleScore) * 100;
    return percentage;
  });
}
