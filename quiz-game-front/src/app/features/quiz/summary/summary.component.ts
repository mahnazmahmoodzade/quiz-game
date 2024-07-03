import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatDialogModule } from "@angular/material/dialog";
import { SummaryStore } from "./store/summary.store";
import { SummaryTableComponent } from "./summary-table/summary-table.component";
import { ErrorTemplateComponent } from "@components/error-template/error-template.component";
import { SpinnerComponent } from "@components/spinner/spinner.component";
@Component({
  selector: "app-summary",
  standalone: true,
  imports: [
    MatDialogModule,
    SummaryTableComponent,
    ErrorTemplateComponent,
    SpinnerComponent,
  ],
  templateUrl: "./summary.component.html",
  styleUrl: "./summary.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SummaryStore],
})
export class SummaryComponent {
  readonly vm = inject(SummaryStore).vm;
}
