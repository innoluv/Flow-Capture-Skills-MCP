import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent } from "../lib/format.js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const metadata = {
  name: "addon-dependency-check",
  description:
    "Validates CPT/HCPCS add-on code dependencies for a claim — flags orphaned add-ons missing a primary and suggests applicable add-ons for present primary codes",
  version: "1.0.0",
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = resolve(__dirname, "../../skills/addon-dependency-check");

function loadFile(relativePath: string): string {
  const fullPath = resolve(SKILL_DIR, relativePath);
  if (!existsSync(fullPath)) return `[File not found: ${relativePath}]`;
  return readFileSync(fullPath, "utf-8");
}

export function register(server: McpServer): void {
  server.tool(
    "addon_dependency_check",
    "Validate and suggest CPT/HCPCS add-on code dependencies for a claim. Flags add-on codes billed without a required primary, and suggests applicable add-ons for primary codes present in the encounter. Requires encounter note, CPT/HCPCS codes, and date of service.",
    {
      encounter_note: z
        .string()
        .describe(
          "Clinical encounter note (SOAP note, op report, H&P, etc.) for the visit"
        ),
      cpt_codes: z
        .array(z.string())
        .describe(
          "CPT/HCPCS procedure codes submitted or being considered for the claim"
        ),
      date_of_service: z
        .string()
        .describe(
          "Date of service in YYYY-MM-DD format — used to validate active/deleted code status and edit rules"
        ),
    },
    async ({ encounter_note, cpt_codes, date_of_service }) => {
      const skillInstructions = loadFile("SKILL.md");

      const aocRefPath = resolve(
        SKILL_DIR,
        "references/AOC_V2026Q2-MCR.xlsx"
      );

      const inputs = [
        `## Encounter Inputs`,
        `**Encounter Note:**\n${encounter_note}`,
        `**CPT/HCPCS Codes:** ${cpt_codes.join(", ")}`,
        `**Date of Service:** ${date_of_service}`,
        `**AOC Reference File Path:** ${aocRefPath}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      return textContent(
        `${skillInstructions}\n\n---\n\n${inputs}\n\n---\n\nNow follow the skill instructions above.`
      );
    }
  );
}
