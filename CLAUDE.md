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
