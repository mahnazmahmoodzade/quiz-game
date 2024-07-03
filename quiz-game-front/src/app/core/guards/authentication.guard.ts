import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore } from "@stores/auth.store";

export const AuthenticationGuard: CanActivateFn = () => {
  const isAuthenticated = inject(AuthStore).isAuthenticated;
  const router = inject(Router);
  if (isAuthenticated()) {
    return true;
  }
  router.navigateByUrl("login");
  return false;
};
