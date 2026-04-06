#!/bin/sh

set -u

EXIT_CODE=0

print_result() {
  status="$1"
  label="$2"
  message="$3"
  printf '%-5s %s: %s\n' "$status" "$label" "$message"
}

mark_fail() {
  EXIT_CODE=1
}

check_command() {
  command_name="$1"
  label="$2"

  if command -v "$command_name" >/dev/null 2>&1; then
    command_path=$(command -v "$command_name")
    print_result "PASS" "$label" "found at $command_path"
    return 0
  fi

  print_result "FAIL" "$label" "not found in PATH"
  mark_fail
  return 1
}

printf 'IDOA preflight: zero-dependency baseline checks\n'
printf 'This script intentionally runs without requiring Node.js.\n\n'

check_command "node" "Node.js"
check_command "npm" "npm"

if [ -n "${PATH:-}" ]; then
  print_result "PASS" "PATH" "PATH is set"
else
  print_result "FAIL" "PATH" "PATH is empty or unset"
  mark_fail
fi

if command -v node >/dev/null 2>&1; then
  node_version=$(node -v 2>/dev/null || printf 'unknown')
  print_result "PASS" "Node version" "$node_version"
fi

if command -v npm >/dev/null 2>&1; then
  npm_version=$(npm -v 2>/dev/null || printf 'unknown')
  print_result "PASS" "npm version" "$npm_version"
fi

if [ -w "." ]; then
  print_result "PASS" "Workspace" "current directory is writable"
else
  print_result "WARN" "Workspace" "current directory is not writable"
fi

if [ -n "${SHELL:-}" ]; then
  print_result "PASS" "Shell" "$SHELL"
else
  print_result "WARN" "Shell" "SHELL is not set"
fi

printf '\n'
if [ "$EXIT_CODE" -ne 0 ]; then
  print_result "FAIL" "Preflight" "critical prerequisites are missing"
else
  print_result "PASS" "Preflight" "baseline prerequisites look ready for deeper diagnostics"
fi

exit "$EXIT_CODE"
