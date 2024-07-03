import {
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
  inject,
} from "@angular/core";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { SummaryComponent } from "../summary/summary.component";
import { AuthStore } from "@stores/auth.store";

@Component({
  selector: "app-quiz-finished",
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: "./quiz-finished.component.html",
  styleUrl: "./quiz-finished.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuizFinishedComponent {
  #dialog = inject(MatDialog);
  #vcr = inject(ViewContainerRef);
  #authStore= inject(AuthStore);
  summary() {
    this.#dialog.open(SummaryComponent, {
      panelClass: ["modal", "modal-start", "modal-xl"],
      viewContainerRef: this.#vcr,
    });
  }
  start(){
    this.#authStore.logout();
  }
}
