import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { HttpErrorHandlerInterceptor } from "@interceptors/http-error.interceptor";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthenticationInterceptor } from "@interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        HttpErrorHandlerInterceptor,
        AuthenticationInterceptor,
      ]),
    ),
    importProvidersFrom(JwtModule.forRoot({})),
  ],
};
