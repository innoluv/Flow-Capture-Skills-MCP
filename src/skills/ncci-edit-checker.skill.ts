import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent } from "../lib/format.js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const metadata = {
  name: "ncci-edit-checker",
  description:
    "Checks NCCI (National Correct Coding Initiative) PTP edit and MUE compliance for procedure code pairs on a claim",
  version: "1.0.0",
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = resolve(__dirname, "../../skills/ncci-edit-checker");

function loadFile(relativePath: string): string {
  const fullPath = resolve(SKILL_DIR, relativePath);
  if (!existsSync(fullPath)) return `[File not found: ${relativePath}]`;
  return readFileSync(fullPath, "utf-8");
}

export function register(server: McpServer): void {
  server.tool(
    "ncci_edit_check",
    "Check NCCI PTP (Procedure-to-Procedure) edits and MUE (Medically Unlikely Edit) limits for a claim. Provide procedure codes, date of service, and payer. Returns skill instructions with bundled PTP and MUE reference data.",
    {
      encounter_json: z
        .string()
        .optional()
        .describe("Full encounter JSON per the skill's input schema (preferred)"),
      cpt_codes: z
        .array(
          z.object({
            code: z.string(),
            modifiers: z.array(z.string()).default([]),
            units: z.number().int().default(1),
          })
        )
        .optional()
        .describe("CPT/HCPCS codes with modifiers and units (alternative to encounter_json)"),
      date_of_service: z
        .string()
        .optional()
        .describe("Date of service (YYYY-MM-DD)"),
      payer_name: z
        .string()
        .optional()
        .describe("Payer name (e.g. 'Medicare', 'United Healthcare')"),
    },
    async ({ encounter_json, cpt_codes, date_of_service, payer_name }) => {
      const skillInstructions = loadFile("SKILL.md");
      const ptpPairs = loadFile("references/common-ptp-pairs.md");
      const mueCodes = loadFile("references/mue-common-codes.md");

      const inputs = encounter_json
        ? `## Encounter Input\n\`\`\`json\n${encounter_json}\n\`\`\``
        : [
            `## Encounter Inputs`,
            cpt_codes?.length
              ? `**Procedure Codes:**\n${cpt_codes.map((c) => `- ${c.code} (modifiers: [${c.modifiers.join(", ")}], units: ${c.units})`).join("\n")}`
              : "",
            date_of_service ? `**Date of Service:** ${date_of_service}` : "",
            payer_name ? `**Payer:** ${payer_name}` : "",
          ]
            .filter(Boolean)
            .join("\n\n");

      const references = [
        `## Reference: Common PTP Pairs\n${ptpPairs}`,
        `## Reference: Common MUE Codes\n${mueCodes}`,
      ].join("\n\n---\n\n");

      return textContent(
        `${skillInstructions}\n\n---\n\n${inputs}\n\n---\n\n${references}\n\n---\n\nNow follow the skill instructions above to check NCCI edits for this encounter.`
      );
    }
  );
}
