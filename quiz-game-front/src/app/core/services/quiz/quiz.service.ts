import { Injectable, inject } from "@angular/core";
import { QueryParamsModel } from "@models/base/base.model";
import {
  GameSummaryModel,
  QuizAnswerPayloadModel,
  QuizAnswerResponseModel,
  QuizModel,
} from "@models/quiz/quiz.model";
import { ApiService } from "@services/base/api.service";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class QuizService {
  #apiService = inject(ApiService);
  readonly #quizPath = "/questions";
  getNextQuestion(params: QueryParamsModel): Observable<QuizModel> {
    return this.#apiService.get(`${this.#quizPath}/next`, params);
  }

  submitAnswer(
    payload: QuizAnswerPayloadModel,
  ): Observable<QuizAnswerResponseModel> {
    return this.#apiService.post(`${this.#quizPath}/submit`, payload);
  }

  getSummary(): Observable<GameSummaryModel> {
    return this.#apiService.get(`${this.#quizPath}/summary`);
  }
}
