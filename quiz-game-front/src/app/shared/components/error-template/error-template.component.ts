import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-error-template",
  standalone: true,
  templateUrl: "./error-template.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorTemplateComponent {}
