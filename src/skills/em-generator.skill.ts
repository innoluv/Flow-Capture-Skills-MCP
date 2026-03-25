import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent } from "../lib/format.js";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const metadata = {
  name: "em-generator",
  description:
    "Assigns E&M (Evaluation & Management) CPT codes from clinical encounter notes using 2021 AMA guidelines",
  version: "1.0.0",
};

function loadSkillMd(): string {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const skillPath = resolve(__dirname, "../../skills/em-generator/SKILL.md");
  return readFileSync(skillPath, "utf-8");
}

export function register(server: McpServer): void {
  server.tool(
    "em_generate",
    "Assign an E&M CPT code for a clinical encounter. Provide the encounter note, visit type, time, CPTs, and diagnoses. Returns the skill instructions and inputs for Claude to process.",
    {
      encounter_note: z.string().describe("Full or partial SOAP/clinical note"),
      visit_type: z
        .string()
        .optional()
        .describe("Type of visit (e.g. 'follow-up', 'new patient', 'ED')"),
      time_minutes: z
        .number()
        .int()
        .optional()
        .describe("Total encounter time in minutes"),
      cpt_codes: z
        .array(z.string())
        .optional()
        .describe("Procedures already coded (CPT/HCPCS)"),
      icd_codes: z
        .array(z.string())
        .optional()
        .describe("ICD-10 diagnosis codes"),
    },
    async ({ encounter_note, visit_type, time_minutes, cpt_codes, icd_codes }) => {
      const skillInstructions = loadSkillMd();
      const inputs = [
        `## Encounter Inputs`,
        `**Encounter Note:**\n${encounter_note}`,
        visit_type ? `**Visit Type:** ${visit_type}` : "",
        time_minutes ? `**Time:** ${time_minutes} minutes` : "",
        cpt_codes?.length ? `**CPTs:** ${cpt_codes.join(", ")}` : "",
        icd_codes?.length ? `**Dx Codes:** ${icd_codes.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      return textContent(
        `${skillInstructions}\n\n---\n\n${inputs}\n\n---\n\nNow follow the skill instructions above to assign the E&M code for this encounter.`
      );
    }
  );
}
