import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { AnswersSummaryItemModel } from "@models/quiz/quiz.model";
import { SafePipe } from "app/shared/pipes/safe.pipe";

@Component({
  selector: "app-summary-table",
  standalone: true,
  imports: [SafePipe],
  templateUrl: "./summary-table.component.html",
  styleUrl: "./summary-table.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryTableComponent {
  answers = input.required<AnswersSummaryItemModel[]>();
}
