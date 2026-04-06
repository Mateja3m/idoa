import type { CheckCategory } from "./types.js";

export function classifyPathFailure(filePath: string): CheckCategory {
  if (filePath.includes("config") || filePath.endsWith(".yaml") || filePath.endsWith(".json")) {
    return "CONFIGURATION";
  }

  return "ENVIRONMENT";
}

export function classifyMissingEnv(variableName: string): CheckCategory {
  if (variableName.startsWith("FABRIC_")) {
    return "CONFIGURATION";
  }

  return "ENVIRONMENT";
}
