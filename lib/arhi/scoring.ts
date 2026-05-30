import { ARHI_QUESTIONS } from "@/lib/arhi/questions";
import { ARHI_DIMENSIONS } from "@/lib/arhi/dimensions";

type AnswerScore = Record<string, number>;

export function calculateArhiScores(
  answerIds: string[]
) {
  const scores: AnswerScore = {};

  for (const answerId of answerIds) {
    const question = ARHI_QUESTIONS.find((q: any) =>
      q.answers.some(
        (answer: any) => answer.id === answerId
      )
    );

    if (!question) continue;

    const answer = question.answers.find(
      (answer: any) => answer.id === answerId
    );

    if (!answer?.codes) continue;

    for (const [code, value] of Object.entries(
      answer.codes
    )) {
      scores[code] =
        (scores[code] || 0) + Number(value);
    }
  }

  return scores;
}

export function calculateArhiDimensions(
  scores: Record<string, number>
) {
  const dimensions: Record<string, number> = {};

  for (const [key, dimension] of Object.entries(
    ARHI_DIMENSIONS
  )) {
    let total = 0;

    for (const code of dimension.codes) {
      total += scores[code] || 0;
    }

    dimensions[key] = total;
  }

  return dimensions;
}