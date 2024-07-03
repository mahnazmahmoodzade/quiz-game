import { HttpErrorResponse } from "@angular/common/http";
import { computed, inject } from "@angular/core";
import { QuizAnswerResponseModel, QuizModel } from "@models/quiz/quiz.model";
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
import { QuizConfigFormService } from "@services/quiz/quiz-config-form.service";
import { QuizService } from "@services/quiz/quiz.service";
import {
  setError,
  setFulfilled,
  setPending,
  withRequestState,
} from "@state/request-state.feature";
import { debounce, debounceTime, exhaustMap, filter, pipe, switchMap, tap } from "rxjs";
import { QuizFormService } from "../quiz-form.service";

interface QuizStateModel {
  quiz: QuizModel | null;
  answer: QuizAnswerResponseModel;
}

const initialState: QuizStateModel = {
  quiz: null,
  answer: {
    correct: false,
    currentScore: 0,
    remainingQuestions: 5,
    totalQuestions: 5,
  },
};

export const QuizStore = signalStore(
  withState(initialState),
  withRequestState({ prefix: "quiz" }),
  withRequestState({ prefix: "answer" }),
  withComputed((store) => ({
    vm: computed(() => ({
      ...store,
      questionStep: computed(()=>{
        const answered=  store.answer().totalQuestions- store.answer().remainingQuestions;
        const total= store.answer().totalQuestions;
        return `${answered} / ${total}`;
      }),
    }))
  })),
  withMethods(
    (
      store,
      quizService = inject(QuizService),
      configFormService = inject(QuizConfigFormService),
      quizFormService = inject(QuizFormService),
    ) => {
      const getNextQuiz = rxMethod<void>(
        pipe(
          filter(() => !!store.answer.remainingQuestions()),
          tap(() => patchState(store, setPending("quiz"))),
          switchMap(() => {
            const params = configFormService.quizConfigForm.getRawValue();
            return quizService.getNextQuestion(params).pipe(
              tapResponse({
                next: (quiz) => {
                  patchState(store, setFulfilled("quiz"), { quiz });
                  quizFormService.resetForm();
                  quizFormService.patchQuestionId(quiz.id);
                },
                error: ({ error }: HttpErrorResponse) =>
                  patchState(store, setError("quiz", error)),
              }),
            );
          }),
        ),
      );
      const submitAnswer = rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending("answer"))),
          debounceTime(5000),
          exhaustMap(() => {
            const payload = quizFormService.quizForm.getRawValue();
            return quizService.submitAnswer(payload).pipe(
              tapResponse({
                next: (answer) => {
                  patchState(store, setFulfilled("answer"), {
                    answer: { ...answer },
                  });
                  getNextQuiz();
                },
                error: ({ error }: HttpErrorResponse) =>
                  patchState(store, setError("answer", error)),
              }),
            );
          }),
        ),
      );
      return { getNextQuiz, submitAnswer };
    },
  ),
  withHooks({
    onInit(store) {
      store.getNextQuiz();
    },
  }),
);
