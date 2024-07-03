import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { ResponseErrorModel } from "@models/base/errors.model";
import { NotificationService } from "@services/ui/notification.service";
import { AuthStore } from "@stores/auth.store";
import { tap } from "rxjs";

export const HttpErrorHandlerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const notificationService = inject(NotificationService);
  const authStore = inject(AuthStore);
  return next(req).pipe(
    tap({
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          authStore.logout();
        } else {
          const responseError: ResponseErrorModel = error.error;
          if (responseError.detail) {
            notificationService.error(`${responseError.detail}`);
          } else {
            notificationService.error(`Something went wrong! Please try again`);
          }
        }
      },
    }),
  );
};
