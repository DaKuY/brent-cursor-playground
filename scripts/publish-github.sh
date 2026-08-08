#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

REPO_NAME="${1:-brent-cursor-playground}"
VISIBILITY="${2:-public}"

if ! command -v gh >/dev/null; then
  echo "GitHub CLI (gh) is required."
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  if [[ -n "${GH_TOKEN:-}" ]]; then
    echo "$GH_TOKEN" | gh auth login --with-token
  else
    echo "Not logged in. Set GH_TOKEN or run: gh auth login"
    exit 1
  fi
fi

git branch -M main 2>/dev/null || true

if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote origin already set:"
  git remote get-url origin
  git push -u origin main
else
  gh repo create "$REPO_NAME" \
    --"$VISIBILITY" \
    --source=. \
    --remote=origin \
    --description "Brent's Cursor Playground — kid-friendly 3-step Cursor tutorial (React + Vite)" \
    --push
fi

echo ""
echo "Done. View at: $(gh repo view --json url -q .url)"
