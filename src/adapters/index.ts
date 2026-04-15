import { fabricAdapter } from "./fabric/index.js";
import type { DiagnosticAdapter } from "./types.js";

const adapters: DiagnosticAdapter[] = [fabricAdapter];

export function getAdapter(name: string): DiagnosticAdapter | undefined {
  return adapters.find((adapter) => adapter.name === name);
}

export function listAdapters(): string[] {
  return adapters.map((adapter) => adapter.name);
}
