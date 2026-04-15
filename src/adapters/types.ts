import type { CheckContext, DiagnosticCheckResult } from "../core/types.js";

export interface DiagnosticAdapter {
  name: string;
  description: string;
  run(context: CheckContext): Promise<DiagnosticCheckResult[]>;
}
