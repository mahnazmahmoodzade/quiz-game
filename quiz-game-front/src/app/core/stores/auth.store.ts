import { computed, inject } from "@angular/core";
import { DecodedTokenModel } from "@models/base/auth.model";
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { tapResponse } from "@ngrx/operators";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { AuthService } from "@services/authentication/auth.service";

import {
  setError,
  setFulfilled,
  setPending,
  withRequestState,
} from "@state/request-state.feature";
import { pipe, switchMap, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

interface AuthStateModel {
  token: string;
}

const initialState: AuthStateModel = {
  token: "",
};

const ACCESS_TOKEN_KEY = "accessToken";

export const AuthStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withRequestState({ prefix: "login" }),
  withComputed((store) => ({
    vm: computed(() => store),
    isAuthenticated: computed(() => {
      if (store.token()) {
        return true;
      }
      return false;
    }),
  })),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      login: rxMethod<string>(
        pipe(
          tap(() => patchState(store, setPending("login"))),
          switchMap((accessCode) =>
            authService.login(accessCode).pipe(
              tapResponse({
                next: ({ token }) => {
                  localStorage.setItem(ACCESS_TOKEN_KEY, token);
                  patchState(store, setFulfilled("login"), { token });
                  router.navigateByUrl("/");
                },
                error: ({ error }: HttpErrorResponse) =>
                  patchState(store, setError("login", error)),
              }),
            ),
          ),
        ),
      ),
      logout: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        patchState(store, { token: "" });
        router.navigateByUrl("/login");
      },
    }),
  ),
  withHooks({
    onInit(store) {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        patchState(store, { token });
      }
    },
  }),
);
