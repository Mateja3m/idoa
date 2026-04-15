import type { DiagnosticCheckResult } from "./types.js";

export function defaultRemediation(status: DiagnosticCheckResult["status"]): string | undefined {
  if (status === "PASS") {
    return undefined;
  }

  if (status === "WARN") {
    return "Review the warning and align the local setup before continuing.";
  }

  return "Resolve this failing prerequisite before relying on deeper onboarding diagnostics.";
}

export function remediationForMissingFile(filePath: string): string {
  return `Create or point the tool at the expected file or directory: ${filePath}`;
}

export function remediationForUnexpectedWorkspace(): string {
  return "Run diagnostics from the target repository root for the most consistent baseline results.";
}

export function remediationForMissingEnv(variableName: string, exampleValue: string): string {
  return `Export ${variableName} before running diagnostics, for example: export ${variableName}=${exampleValue}`;
}

export function remediationForNodeVersion(requiredMajor: number): string {
  return `Install Node.js ${requiredMajor}+ and rerun scripts/preflight.sh before using the CLI.`;
}
