# Flow Code Skills MCP

A modular MCP (Model Context Protocol) server that gives Claude Code access to specialized medical coding skills and utility tools. Each skill is a self-contained module that Claude can invoke during conversations.

---

## First-Time Setup (5 minutes)

### Prerequisites

- **Node.js 18+** — [download here](https://nodejs.org/) (check with `node --version`)
- **Claude Code CLI** — [download here](https://claude.ai/download) (check with `claude --version`)
- **Git** — pre-installed on macOS/Linux; [download for Windows](https://git-scm.com/)

### Step 1: Clone the repo

```bash
git clone https://github.com/innoluv/Flow-Code-Skills-MCP.git
cd "Flow Code Skills MCP"
```

### Step 2: Install and build

```bash
npm install
npm run build
```

### Step 3: Register the MCP server with Claude Code

```bash
claude mcp add --transport stdio flow-code-skills -- node "$(pwd)/dist/index.js"
```

### Step 4: Verify

Start a new Claude Code session (restart if one is already open) and ask:

> "List all available flow code skills"

Claude should call the `list_skills` tool and show you the full catalog.

**That's it.** All skills are now available in every Claude Code session.

### Alternative: One-Command Setup

If you've already cloned the repo, run:

```bash
bash setup.sh
```

This installs, builds, and registers the server in one step.

---

## Available Skills

### Medical Coding

| Tool | What it does |
|------|-------------|
| `em_generate` | Assigns E&M CPT codes from clinical encounter notes (2021 AMA guidelines) |
| `icd_validate` | Validates ICD-10-CM codes for specificity, excludes conflicts, sequencing, billability |
| `medical_necessity_check` | Checks ICD-CPT alignment and documentation completeness against CMS guidelines |
| `ncci_edit_check` | Checks NCCI PTP edit and MUE compliance for procedure code pairs |

### Utilities

| Tool | What it does |
|------|-------------|
| `greet_user` | Personalized greeting (test/demo) |
| `text_to_slug` | Converts text to URL-friendly slugs |
| `text_count_words` | Counts words, characters, sentences, paragraphs |
| `text_extract_emails` | Extracts email addresses from text |
| `json_validate` | Validates JSON strings |
| `json_format` | Pretty-prints JSON |

### Meta

| Tool | What it does |
|------|-------------|
| `list_skills` | Returns the full catalog of all available skills and tools |

---

## Using the Orchestrator Skill

The orchestrator is a Claude Code skill that acts as an intelligent router — it picks the right MCP tool based on your request.

### Install the orchestrator (optional)

Copy it into any project where you want the `/flow-skills` command:

```bash
mkdir -p /path/to/your/project/.claude/skills/flow-skills
cp orchestrator/SKILL.md /path/to/your/project/.claude/skills/flow-skills/SKILL.md
```

Then use it:

```
/flow-skills check NCCI edits for CPT 99214 and 93000
/flow-skills assign E&M code for this encounter note
/flow-skills validate these ICD codes: E11.9, I10, Z00.00
```

Without the orchestrator, you can still use the tools directly — Claude sees all MCP tools and will pick the right one based on your request.

---

## Keeping Up to Date

When new skills are added or existing ones are updated:

```bash
cd "Flow Code Skills MCP"
git pull
npm run build
```

Then restart your Claude Code session to pick up the changes.

---

## Troubleshooting

**"MCP server not found" or tools not showing up**

1. Check the server is registered: `claude mcp list`
2. If missing, re-register: `claude mcp add --transport stdio flow-code-skills -- node "$(pwd)/dist/index.js"`
3. Restart your Claude Code session

**"Cannot find module" errors**

Run `npm run build` — the TypeScript needs to be compiled before the server can run.

**Check server status inside Claude Code**

Type `/mcp` in a Claude Code session to see all connected MCP servers and their status.

**Test the server manually**

```bash
npm run start:inspect
```

This opens an interactive browser UI where you can call tools and see responses.

---

## For Contributors

### Development commands

```bash
npm install          # Install dependencies
npm run build        # Compile TypeScript
npm run dev          # Watch mode (auto-recompile on changes)
npm run start:inspect # Interactive MCP Inspector (browser UI)
npm test             # Run tests
```

### Skill file policy

Files under `skills/` are **read-only imports** from external skill authors. See [CLAUDE.md](CLAUDE.md) for the full policy. Never edit skill files in-place — only replace entire directories with new versions.

### Adding a new MCP tool stub

See [CLAUDE.md](CLAUDE.md) and `src/skills/hello-world.skill.ts` as a template. The pattern:

1. Create `src/skills/my-skill.skill.ts` exporting `metadata` + `register(server)`
2. Add import + array entry in `src/skills/index.ts`
3. `npm run build && npm test`

### Architecture

```
skills/               # Imported SKILL.md files + references (READ-ONLY)
src/
├── index.ts          # Local stdio entry point
├── server.ts         # Shared server factory
├── types.ts          # SkillModule interface
├── skills/           # MCP tool stubs (editable repo code)
│   ├── index.ts      # Skill registry
│   └── *.skill.ts    # One per skill
└── lib/              # Shared utilities
orchestrator/         # Claude Code orchestrator skill
```
