#!/usr/bin/env bash
set -euo pipefail

# Flow Capture Skills MCP — Local Setup Script
# Usage: bash setup.sh

SERVER_NAME="flow-capture-skills"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DIST_PATH="$SCRIPT_DIR/dist/index.js"

echo "=== Flow Capture Skills MCP — Local Setup ==="
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

if [ ! -f "$SCRIPT_DIR/package.json" ]; then
  echo "Error: Run this script from the Flow Capture Skills MCP repo root."
  exit 1
fi

# Install and build
echo "[1/4] Installing dependencies..."
cd "$SCRIPT_DIR"
npm install --silent

echo "[2/4] Building..."
npm run build --silent

# Register with Claude Code CLI (if available)
if command -v claude &> /dev/null; then
  echo "[3/4] Registering MCP server with Claude Code CLI..."
  claude mcp add --transport stdio --scope user "$SERVER_NAME" -- node "$DIST_PATH"
else
  echo "[3/4] Claude Code CLI not found — skipping CLI registration"
fi

# Register with Claude Desktop
echo "[4/4] Registering MCP server with Claude Desktop..."

# Detect config path (macOS vs Linux)
if [ "$(uname)" = "Darwin" ]; then
  DESKTOP_CONFIG="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
else
  DESKTOP_CONFIG="$HOME/.config/Claude/claude_desktop_config.json"
fi

if [ -d "$(dirname "$DESKTOP_CONFIG")" ]; then
  # Use node to safely merge the MCP server into the Desktop config
  node -e "
    const fs = require('fs');
    const configPath = process.argv[1];
    const serverName = process.argv[2];
    const distPath = process.argv[3];

    let config = {};
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
      // File doesn't exist or is invalid — start fresh
    }

    if (!config.mcpServers) config.mcpServers = {};

    config.mcpServers[serverName] = {
      command: 'node',
      args: [distPath]
    };

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
    console.log('  Added to: ' + configPath);
  " "$DESKTOP_CONFIG" "$SERVER_NAME" "$DIST_PATH"
else
  echo "  Claude Desktop not found — skipping Desktop registration"
fi

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Restart Claude Code and/or Claude Desktop"
echo "  2. Ask Claude: \"List all available flow code skills\""
echo "  3. Skills are now available in all sessions (any directory)"
echo ""
echo "To update later:  git pull && npm run build"
echo "To check status:  claude mcp list"
