import { Component, input } from "@angular/core";

@Component({
  selector: "button[loading]",
  exportAs: "buttonLoading",
  standalone: true,
  template: `
    @if (loading()) {
      <div class="btn-spinner"></div>
    }
    <span class="btn-label">
      <ng-content />
    </span>
  `,
  host: {
    "[class.btn-is-loading]": "loading()",
  },
})
export class ButtonLoadingComponent {
  loading = input.required<boolean>();
}
