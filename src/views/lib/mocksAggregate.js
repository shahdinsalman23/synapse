/**
 * Aggregate mock stats across all mocks (e.g. 5 mocks on mock section).
 * Score = total correct / total questions.
 * Progress = total attempted / total questions.
 */
export function mocksAggregateTotals(mocks) {
  let totalQuestions = 0;
  let totalCorrect = 0;
  let totalAttempted = 0;
  for (const item of mocks || []) {
    const qTotal = item.quest && item.quest.length ? item.quest.length : 0;
    totalQuestions += qTotal;
    if (item.score && item.score.length > 0) {
      totalAttempted += item.score.length;
      totalCorrect += item.score.filter((s) => s.correct == 1).length;
    }
  }
  return { totalQuestions, totalCorrect, totalAttempted };
}

export function mocksAggregateScorePercent(mocks) {
  const { totalQuestions, totalCorrect } = mocksAggregateTotals(mocks);
  if (!totalQuestions) return 0;
  return Math.round((totalCorrect / totalQuestions) * 100);
}

export function mocksAggregateProgressPercent(mocks) {
  const { totalQuestions, totalAttempted } = mocksAggregateTotals(mocks);
  if (!totalQuestions) return 0;
  return Math.round((totalAttempted / totalQuestions) * 100);
}
