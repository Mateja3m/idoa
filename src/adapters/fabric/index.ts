import type { DiagnosticAdapter } from "../types.js";
import { runFabricChecks } from "./checks.js";

export const fabricAdapter: DiagnosticAdapter = {
  name: "fabric",
  description: "Reference onboarding adapter for Hyperledger Fabric.",
  async run(context) {
    return runFabricChecks(context);
  }
};
