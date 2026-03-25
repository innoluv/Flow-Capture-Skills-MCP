import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent } from "../lib/format.js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const metadata = {
  name: "icd-validator",
  description:
    "Validates ICD-10-CM codes against clinical encounter notes for specificity, sequencing, excludes conflicts, and billability",
  version: "1.0.0",
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = resolve(__dirname, "../../skills/icd-validator");

function loadFile(relativePath: string): string {
  const fullPath = resolve(SKILL_DIR, relativePath);
  if (!existsSync(fullPath)) return `[File not found: ${relativePath}]`;
  return readFileSync(fullPath, "utf-8");
}

export function register(server: McpServer): void {
  server.tool(
    "icd_validate",
    "Validate ICD-10-CM codes against a clinical encounter note. Checks specificity, excludes1 conflicts, etiology/manifestation sequencing, billability, and demographics. Returns skill instructions with bundled reference data.",
    {
      encounter_note: z.string().describe("Full or partial clinical note"),
      icd_codes: z
        .array(z.string())
        .describe("Proposed ICD-10-CM codes to validate"),
      patient_age: z.number().int().optional().describe("Patient age in years"),
      patient_sex: z
        .enum(["male", "female", "other"])
        .optional()
        .describe("Patient sex"),
    },
    async ({ encounter_note, icd_codes, patient_age, patient_sex }) => {
      const skillInstructions = loadFile("SKILL.md");
      const excludes1 = loadFile("references/excludes1_pairs.md");
      const seventhChar = loadFile("references/seventh_char_rules.md");
      const manifEtiology = loadFile("references/manifestation_etiology_pairs.md");
      const nonBillable = loadFile("references/non_billable_headers.md");

      const inputs = [
        `## Encounter Inputs`,
        `**Encounter Note:**\n${encounter_note}`,
        `**ICD Codes:** ${icd_codes.join(", ")}`,
        patient_age !== undefined ? `**Patient Age:** ${patient_age}` : "",
        patient_sex ? `**Patient Sex:** ${patient_sex}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      const references = [
        `## Reference: Excludes1 Pairs\n${excludes1}`,
        `## Reference: 7th Character Rules\n${seventhChar}`,
        `## Reference: Manifestation/Etiology Pairs\n${manifEtiology}`,
        `## Reference: Non-Billable Headers\n${nonBillable}`,
        `Note: For specificity lookup, run: echo '${JSON.stringify(icd_codes)}' | python3 references/specificity_lookup.py`,
      ].join("\n\n---\n\n");

      return textContent(
        `${skillInstructions}\n\n---\n\n${inputs}\n\n---\n\n${references}\n\n---\n\nNow follow the skill instructions above to validate these ICD codes.`
      );
    }
  );
}
