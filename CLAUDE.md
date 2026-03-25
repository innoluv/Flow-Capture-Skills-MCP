# Project Rules

## Skill Files Are Read-Only Imports

Files under `skills/` are **externally authored** and imported into this repo as-is. They must never be edited in-place.

### Rules

1. **NEVER edit individual lines** in any file under `skills/**/*` (SKILL.md, reference files, etc.)
2. **Only full replacements are allowed** — overwrite the entire skill directory with a new version from the skill owner
3. **MCP tool stubs** in `src/skills/*.skill.ts` ARE editable — they are repo-owned code, not imports

### Workflow for Updating a Skill

1. Receive the new `.skill` archive from the skill owner
2. Extract it: `unzip -o new-skill.skill -d /tmp/skill-extract`
3. Replace the entire skill directory: `rm -rf skills/<skill-name> && cp -r /tmp/skill-extract/<skill-name> skills/<skill-name>`
4. **Append a row to `skills/CHANGELOG.md`** with: date, skill name, action (Updated vX.X.X), author, source file
5. Rebuild: `npm run build && npm test`
6. Commit the replacement

### Why

Skill files are the canonical source of truth written by domain experts (medical coders, compliance specialists). Editing them in this repo creates drift from the canonical version. If a skill needs changes, the skill owner updates it and provides a new `.skill` archive.

---

## Adding a New Skill

When a new skill directory is added to `skills/` (e.g. `skills/my-new-skill/SKILL.md`), follow these steps to expose it as an MCP tool.

### Step 1: Read the SKILL.md frontmatter

Parse the `name` and `description` from the YAML frontmatter. These go into the `metadata` export.

### Step 2: Identify the tool interface

Read the SKILL.md body to understand what inputs the skill expects. Define:
- **Tool name**: the skill `name` with hyphens replaced by underscores (e.g. `my-new-skill` → `my_new_skill`)
- **Tool description**: a one-line summary of what the tool does and what inputs to provide
- **Parameters**: each input as a Zod schema field — use the simplest type that fits

### Step 3: Create the `.skill.ts` stub

Create `src/skills/<skill-name>.skill.ts` using this template:

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent } from "../lib/format.js";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const metadata = {
  name: "<skill-name>",
  description: "<catalog description from SKILL.md frontmatter>",
  version: "1.0.0",
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = resolve(__dirname, "../../skills/<skill-name>");

function loadFile(relativePath: string): string {
  const fullPath = resolve(SKILL_DIR, relativePath);
  if (!existsSync(fullPath)) return `[File not found: ${relativePath}]`;
  return readFileSync(fullPath, "utf-8");
}

function loadReferences(): string {
  const refsDir = resolve(SKILL_DIR, "references");
  if (!existsSync(refsDir)) return "";
  const files = readdirSync(refsDir).filter((f) => f.endsWith(".md")).sort();
  if (!files.length) return "";
  return files
    .map((f) => `## Reference: ${f}\n${loadFile(`references/${f}`)}`)
    .join("\n\n---\n\n");
}

export function register(server: McpServer): void {
  server.tool(
    "<tool_name>",
    "<tool description>",
    {
      // Define parameters here using Zod
      // example_required: z.string().describe("Description"),
      // example_optional: z.string().optional().describe("Description"),
      // example_array: z.array(z.string()).optional().describe("Description"),
      // example_enum: z.enum(["a", "b", "c"]).optional().describe("Description"),
      // example_number: z.number().int().optional().describe("Description"),
    },
    async (params) => {
      const skillInstructions = loadFile("SKILL.md");
      const references = loadReferences();

      const inputs = [
        `## Encounter Inputs`,
        // Format each param, skipping undefined/empty values:
        // params.field ? `**Label:** ${params.field}` : "",
        // Array.isArray(params.arr) && params.arr.length ? `**Label:** ${params.arr.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      const sections = [skillInstructions, inputs, references]
        .filter(Boolean)
        .join("\n\n---\n\n");

      return textContent(
        `${sections}\n\n---\n\nNow follow the skill instructions above.`
      );
    }
  );
}
```

### Step 4: Register in index.ts

Edit `src/skills/index.ts`:
1. Add the import: `import * as myNewSkill from "./<skill-name>.skill.js";`
2. Add to the `skills` array: `myNewSkill,`

### Step 5: Build and test

```bash
npm run build && npm test
```

### Checklist

- [ ] `.skill.ts` metadata `name` matches the skill directory name
- [ ] Tool name uses underscores, not hyphens
- [ ] All required params lack `.optional()`, all optional params have it
- [ ] Every param has `.describe()` with a clear description
- [ ] References are loaded (use `loadReferences()` for auto-loading all .md files, or load specific files manually if the skill needs selective loading)
- [ ] Input formatting skips undefined/empty values
- [ ] Import added to `src/skills/index.ts`
- [ ] `npm run build` succeeds
- [ ] `npm test` passes
