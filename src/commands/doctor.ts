import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { fabricAdapter } from "../adapters/fabric/index.js";
import { runCoreChecks } from "../core/checks.js";
import { countStatuses } from "../core/result.js";
import type { CheckContext, DoctorOptions, DoctorReport } from "../core/types.js";

const SUPPORTED_ADAPTERS = new Map([[fabricAdapter.name, fabricAdapter]]);
const PACKAGE_JSON_PATH = fileURLToPath(new URL("../../package.json", import.meta.url));

export async function runDoctor(options: DoctorOptions): Promise<number> {
  const context: CheckContext = {
    cwd: process.cwd(),
    env: process.env,
    adapter: options.adapter
  };

  const results = await runCoreChecks(context);

  if (options.adapter) {
    const adapter = SUPPORTED_ADAPTERS.get(options.adapter);
    if (!adapter) {
      const supported = Array.from(SUPPORTED_ADAPTERS.keys()).join(", ");
      process.stderr.write(`Unknown adapter "${options.adapter}". Supported adapters: ${supported}\n`);
      return 1;
    }

    results.push(...(await adapter.run(context)));
  }

  const report = await createReport(results, options.adapter);

  if (options.json) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    printHumanReport(report);
  }

  return report.summary.fail > 0 ? 1 : 0;
}

async function createReport(results: DoctorReport["results"], adapter?: string): Promise<DoctorReport> {
  return {
    tool: "idoa",
    version: await readVersion(),
    generated_at: new Date().toISOString(),
    adapter,
    summary: countStatuses(results),
    results
  };
}

async function readVersion(): Promise<string> {
  try {
    const raw = await readFile(PACKAGE_JSON_PATH, "utf8");
    const parsed = JSON.parse(raw) as { version?: string };
    return parsed.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}

function printHumanReport(report: DoctorReport) {
  process.stdout.write("IDOA doctor\n");
  process.stdout.write("Infrastructure for Deterministic Onboarding & Analysis\n");
  process.stdout.write(`Version: ${report.version}\n`);
  process.stdout.write(`Generated: ${report.generated_at}\n`);
  process.stdout.write(`Adapter: ${report.adapter ?? "core"}\n\n`);

  for (const result of report.results) {
    process.stdout.write(`[${result.status}] ${result.title}\n`);
    process.stdout.write(`  id: ${result.id}\n`);
    process.stdout.write(`  category: ${result.category}\n`);
    process.stdout.write(`  summary: ${result.summary}\n`);
    process.stdout.write(`  details: ${result.details}\n`);
    if (result.suggested_fix) {
      process.stdout.write(`  suggested_fix: ${result.suggested_fix}\n`);
    }
    process.stdout.write("\n");
  }

  process.stdout.write(
    `Summary: PASS=${report.summary.pass} WARN=${report.summary.warn} FAIL=${report.summary.fail}\n`
  );
}
