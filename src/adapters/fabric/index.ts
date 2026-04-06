import type { CheckContext, DiagnosticCheckResult } from "../../core/types.js";
import { runFabricChecks } from "./checks.js";

export const fabricAdapter = {
  name: "fabric",
  description: "Reference onboarding adapter for Hyperledger Fabric.",
  async run(context: CheckContext): Promise<DiagnosticCheckResult[]> {
    return runFabricChecks(context);
  }
};
