import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import { ButtonLoadingComponent } from "@components/button-loading/button-loading.component";
import { AuthStore } from "@stores/auth.store";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule, ButtonLoadingComponent],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  #authStore = inject(AuthStore);
  readonly vm = this.#authStore.vm;
  readonly accessCode = inject(FormBuilder).nonNullable.control("",Validators.required);

  login() {
    this.#authStore.login(this.accessCode.value);
  }
}
