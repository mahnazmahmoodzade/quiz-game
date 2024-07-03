import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpHeaders,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthStore } from "@stores/auth.store";

export const AuthenticationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authStore = inject(AuthStore);
  req = req.clone({
    headers: new HttpHeaders({
      Authorization: `Bearer ${authStore.token()}`,
    }),
  });
  return next(req);
};
