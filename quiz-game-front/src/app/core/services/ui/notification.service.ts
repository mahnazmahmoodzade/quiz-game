import { Injectable, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class NotificationService {
  #snackBar = inject(MatSnackBar);
  #duration = 4_000;
  notification(message: string) {
    this.#snackBar.open(message, "", {
      duration: this.#duration,
      panelClass: ["toast"],
    });
  }
  error(message: string) {
    this.#snackBar.open(message, "", {
      duration: this.#duration,
      panelClass: ["toast", "toast-danger"],
    });
  }
  success(message: string) {
    this.#snackBar.open(message, "", {
      duration: this.#duration,
      panelClass: ["toast", "toast-success"],
    });
  }
}
