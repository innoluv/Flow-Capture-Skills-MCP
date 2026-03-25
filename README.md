# Flow Code Skills MCP

A modular Model Context Protocol (MCP) server that hosts individual skills as tools for Claude Code. Each skill is a self-contained module that can be invoked by Claude to perform specific tasks.

## Quick Start

### Connect to Remote Server (Recommended)

```bash
claude mcp add --transport http flow-code-skills https://YOUR_WORKER_URL/mcp
```

### Connect Locally

```bash
git clone https://github.com/innoluv/Flow-Code-Skills-MCP.git
cd "Flow Code Skills MCP"
npm install && npm run build
claude mcp add --transport stdio flow-code-skills -- node dist/index.js
```

Or use the setup script:

```bash
bash setup.sh
```

## Available Skills

| Skill | Tools | Description |
|-------|-------|-------------|
| hello-world | `greet_user` | Personalized greetings in different styles |
| text-transform | `text_to_slug`, `text_count_words`, `text_extract_emails` | Text transformation and analysis |
| json-utils | `json_validate`, `json_format` | JSON validation and formatting |
| _catalog | `list_skills` | Returns the full skill catalog at runtime |

## Using the Orchestrator

The `orchestrator/SKILL.md` file is a Claude Code skill that acts as an intelligent router. Copy it to your project's `.claude/skills/` directory:

```bash
cp orchestrator/SKILL.md /path/to/your/project/.claude/skills/flow-skills/SKILL.md
```

Then invoke it with `/flow-skills <your request>` and Claude will automatically pick the right tool.

## Adding a New Skill

1. Create `src/skills/my-skill.skill.ts`:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent } from "../lib/format.js";

export const metadata = {
  name: "my-skill",
  description: "What this skill does",
  version: "1.0.0",
};

export function register(server: McpServer): void {
  server.tool(
    "my_tool_name",
    "Description of what this tool does",
    { input: z.string().describe("The input parameter") },
    async ({ input }) => {
      return textContent(`Result: ${input}`);
    }
  );
}
```

2. Register it in `src/skills/index.ts`:

```typescript
import * as mySkill from "./my-skill.skill.js";

const skills: SkillModule[] = [
  // ...existing skills
  mySkill,
];
```

3. Build and test:

```bash
npm run build && npm test
```

The `list_skills` meta-tool and orchestrator SKILL.md auto-discover new skills — no extra config needed.

## Development

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run dev          # Watch mode
npm run start:inspect # Test with MCP Inspector (browser UI)
npm test             # Run tests
```

## Deployment (Cloudflare Workers)

```bash
npx wrangler login           # Authenticate with Cloudflare
npm run worker:dev            # Local CF Workers dev server
npm run worker:deploy         # Deploy to production
```

After deploying, share the URL with others:

```bash
claude mcp add --transport http flow-code-skills https://flow-code-skills-mcp.YOUR_ACCOUNT.workers.dev/mcp
```

## Architecture

```
src/
├── index.ts          # Local stdio entry point
├── worker.ts         # Cloudflare Workers entry point
├── server.ts         # Shared server factory
├── types.ts          # SkillModule interface
├── skills/           # One file per skill (self-contained)
│   ├── index.ts      # Skill registry (explicit manifest)
│   └── *.skill.ts    # Individual skills
└── lib/              # Shared utilities
```

Both entry points share the same skill registry. Skills are transport-agnostic.
