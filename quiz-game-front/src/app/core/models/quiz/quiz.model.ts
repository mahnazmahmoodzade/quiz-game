export interface QuizModel {
  id: string;
  text: string;
  options: string[];
}

export interface QuizAnswerPayloadModel {
  questionId: string;
  answer: string;
}

export interface QuizAnswerResponseModel {
  correct: boolean;
  currentScore: number;
  remainingQuestions: number;
  totalQuestions: number;
}

export interface GameSummaryModel {
  score: number;
  answers: AnswersSummaryItemModel[];
}

export interface AnswersSummaryItemModel {
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
  isCorrect: boolean;
}
