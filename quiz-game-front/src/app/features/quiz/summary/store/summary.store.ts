import { HttpErrorResponse } from "@angular/common/http";
import { computed, inject } from "@angular/core";
import { GameSummaryModel } from "@models/quiz/quiz.model";
import { tapResponse } from "@ngrx/operators";
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { QuizService } from "@services/quiz/quiz.service";
import {
  setError,
  setFulfilled,
  setPending,
  withRequestState,
} from "@state/request-state.feature";
import { pipe, switchMap, tap } from "rxjs";

interface SummaryStateModel {
  summary: GameSummaryModel | null;
}

const initialState: SummaryStateModel = {
  summary: null,
};

export const SummaryStore = signalStore(
  withState(initialState),
  withRequestState({ prefix: "summary" }),
  withComputed((store) => ({
    vm: computed(() => store),
  })),
  withMethods((store, quizService = inject(QuizService)) => ({
    getSummary: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setPending("summary"))),
        switchMap(() =>
          quizService.getSummary().pipe(
            tapResponse({
              next: (summary) =>
                patchState(store, setFulfilled("summary"), { summary }),
              error: ({ error }: HttpErrorResponse) =>
                patchState(store, setError("summary", error)),
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      store.getSummary();
    },
  }),
);
