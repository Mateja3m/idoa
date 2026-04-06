import type { CheckCategory, CheckStatus, DiagnosticCheckResult } from "./types.js";

interface ResultInput {
  id: string;
  title: string;
  status: CheckStatus;
  category: CheckCategory;
  summary: string;
  details: string;
  suggested_fix?: string;
}

export function createResult(input: ResultInput): DiagnosticCheckResult {
  return {
    id: input.id,
    title: input.title,
    status: input.status,
    category: input.category,
    summary: input.summary,
    details: input.details,
    suggested_fix: input.suggested_fix
  };
}

export function countStatuses(results: DiagnosticCheckResult[]) {
  return results.reduce(
    (accumulator, result) => {
      accumulator[result.status.toLowerCase() as "pass" | "warn" | "fail"] += 1;
      return accumulator;
    },
    { pass: 0, warn: 0, fail: 0 }
  );
}
