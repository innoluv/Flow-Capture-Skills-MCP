#!/usr/bin/env bash
set -euo pipefail

# Flow Code Skills MCP — Quick Connect Script
# Usage: bash setup.sh

REMOTE_URL="${FLOW_SKILLS_URL:-}"
SERVER_NAME="flow-code-skills"

echo "=== Flow Code Skills MCP — Setup ==="
echo ""

# Check for Claude Code CLI
if ! command -v claude &> /dev/null; then
  echo "Error: Claude Code CLI not found."
  echo "Install it from: https://claude.ai/download"
  exit 1
fi

echo "Choose connection mode:"
echo "  1) Remote (connect to hosted server via URL)"
echo "  2) Local  (clone repo and run locally via stdio)"
echo ""
read -rp "Enter 1 or 2: " mode

case "$mode" in
  1)
    if [ -z "$REMOTE_URL" ]; then
      read -rp "Enter the MCP server URL (e.g. https://your-worker.workers.dev/mcp): " REMOTE_URL
    fi
    echo ""
    echo "Connecting to remote server..."
    claude mcp add --transport http "$SERVER_NAME" "$REMOTE_URL"
    echo ""
    echo "Done! Start a Claude Code session and your Flow Code Skills are ready."
    ;;
  2)
    SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
    if [ ! -f "$SCRIPT_DIR/package.json" ]; then
      echo "Error: Run this script from the Flow Code Skills MCP repo root."
      exit 1
    fi
    echo ""
    echo "Installing dependencies and building..."
    cd "$SCRIPT_DIR"
    npm install
    npm run build
    echo ""
    echo "Registering local MCP server..."
    claude mcp add --transport stdio "$SERVER_NAME" -- node "$SCRIPT_DIR/dist/index.js"
    echo ""
    echo "Done! Start a Claude Code session and your Flow Code Skills are ready."
    ;;
  *)
    echo "Invalid choice. Please run again and enter 1 or 2."
    exit 1
    ;;
esac
