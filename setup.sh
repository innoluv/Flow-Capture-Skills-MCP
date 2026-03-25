#!/usr/bin/env bash
set -euo pipefail

# Flow Code Skills MCP — Local Setup Script
# Usage: bash setup.sh

SERVER_NAME="flow-code-skills"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Flow Code Skills MCP — Local Setup ==="
echo ""

# Check prerequisites
if ! command -v node &> /dev/null; then
  echo "Error: Node.js not found. Install it from https://nodejs.org/"
  exit 1
fi

NODE_VERSION=$(node --version | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo "Error: Node.js 18+ required (found $(node --version))."
  echo "Update from https://nodejs.org/"
  exit 1
fi

if ! command -v claude &> /dev/null; then
  echo "Error: Claude Code CLI not found."
  echo "Install it from https://claude.ai/download"
  exit 1
fi

if [ ! -f "$SCRIPT_DIR/package.json" ]; then
  echo "Error: Run this script from the Flow Code Skills MCP repo root."
  exit 1
fi

# Install and build
echo "[1/3] Installing dependencies..."
cd "$SCRIPT_DIR"
npm install --silent

echo "[2/3] Building..."
npm run build --silent

# Register with Claude Code
echo "[3/3] Registering MCP server with Claude Code..."
claude mcp add --transport stdio "$SERVER_NAME" -- node "$SCRIPT_DIR/dist/index.js"

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Start (or restart) a Claude Code session"
echo "  2. Ask Claude: \"List all available flow code skills\""
echo "  3. All tools are now available automatically"
echo ""
echo "To update later:  git pull && npm run build"
echo "To check status:  claude mcp list"
