# IDOA - Infrastructure for Deterministic Onboarding & Analysis

This repository is the implementation repo for the LF Decentralized Trust Labs proposal **Onboarding Reliability Lab**. The project focuses on a practical problem in decentralized systems: developers lose time during onboarding because setup failures are often ambiguous, environment-specific, and hard to remediate consistently.

IDOA is a small open-source toolchain for making onboarding failures more deterministic, interpretable, and actionable.

## Why this exists

In decentralized development stacks, onboarding friction often appears before application logic ever runs. Missing runtimes, shell path issues, incomplete configuration, and inconsistent local setup create failure modes that are difficult to diagnose from error messages alone.

IDOA is designed to:

- check baseline prerequisites before deeper tooling runs
- classify onboarding issues into structured categories
- provide concise remediation guidance
- emit machine-readable output for later analysis and automation

## Layered execution model

IDOA intentionally avoids the bootstrap paradox where a Node-based CLI tries to determine whether Node itself is installed.

The project uses three layers:

1. **Preflight Layer**: a zero-dependency shell script for first-run readiness checks.
2. **CLI Diagnostics Layer**: a TypeScript CLI for deeper diagnostics after the baseline is ready.
3. **Adapter Layer**: system-specific onboarding checks built on the shared diagnostics core.

### Preflight comes first

The preflight script does not require Node.js. It checks for:

- Node.js presence
- npm presence
- PATH readiness
- basic shell and workspace state

This makes it safe to run as the first onboarding step.

Run it with:

```sh
sh scripts/preflight.sh
```

The script prints `PASS`, `WARN`, and `FAIL` style results and exits non-zero when critical prerequisites are missing.

## CLI diagnostics

After preflight passes and Node.js is available, build the CLI:

```sh
npm install
npm run build
```

Run the local CLI directly:

```sh
node dist/index.js doctor
node dist/index.js doctor --json
node dist/index.js doctor --adapter fabric
```

Optional local linking is supported after build:

```sh
npm link
idoa doctor
```

## Current scope

This v0 scaffold includes:

- baseline environment checks for Node.js, npm, PATH, and local config files
- a structured diagnostics result schema
- human-readable and JSON output modes
- actionable remediation guidance for warnings and failures
- a reference Hyperledger Fabric adapter path

This repository does **not** attempt to implement heavy network integrations or production orchestration logic in v0. The goal is a credible and understandable early implementation aligned with the proposal.

## Hyperledger Fabric reference adapter

Hyperledger Fabric is the initial reference adapter, not a hard-coded product boundary for the project.

The Fabric adapter currently performs lightweight checks such as:

- presence of expected Fabric-related markers in the working directory
- presence of adapter-specific environment variables
- placeholder readiness checks for future peer and orderer validation

The shared core is intended to expand later to other decentralized systems while remaining vendor-neutral and open-source friendly.

## Result schema

Each check result includes:

- `id`
- `title`
- `status` (`PASS`, `WARN`, `FAIL`)
- `category`
- `summary`
- `details`
- `suggested_fix`

Current categories:

- `ENVIRONMENT`
- `CONFIGURATION`
- `CONNECTIVITY`
- `DEPENDENCY`
- `PERMISSIONS`
- `UNKNOWN`
