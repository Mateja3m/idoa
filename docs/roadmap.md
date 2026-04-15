# Roadmap

This roadmap is intentionally near-term and implementation-focused.

## Phase 1: Repository Foundation and CLI Skeleton

- keep the repository positioned around onboarding diagnostics
- maintain a clean TypeScript CLI entrypoint for `idoa doctor`
- preserve deterministic human-readable and JSON output

## Phase 2: Preflight Checks

- expand zero-dependency readiness checks in `scripts/preflight.sh`
- cover the most common baseline issues before deeper tooling runs
- keep the checks understandable and safe to run on first contact

## Phase 3: Adapter Contract and First Fabric-Oriented Checks

- keep a small adapter contract for target-specific diagnostics
- add first Fabric-oriented checks around expected local configuration markers
- avoid claiming complete Fabric support before validation depth exists

## Phase 4: Actionable Remediation and Report Shaping

- improve remediation messages so failed checks are easier to fix
- make warning versus failure boundaries clearer
- refine JSON and terminal reports without adding speculative platform features
