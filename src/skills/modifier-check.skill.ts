import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent } from "../lib/format.js";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const metadata = {
  name: "modifier-check",
  description:
    "Validates and suggests CPT/HCPCS modifiers for claim line items — checks eligibility, validity, and clinical necessity for all modifier categories",
  version: "1.0.0",
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const SKILL_DIR = resolve(__dirname, "../../skills/modifier-check");

function loadFile(relativePath: string): string {
  const fullPath = resolve(SKILL_DIR, relativePath);
  if (!existsSync(fullPath)) return `[File not found: ${relativePath}]`;
  return readFileSync(fullPath, "utf-8");
}

function loadReferences(): string {
  const refsDir = resolve(SKILL_DIR, "references");
  if (!existsSync(refsDir)) return "";
  const files = readdirSync(refsDir)
    .filter((f) => f.endsWith(".md"))
    .sort();
  if (!files.length) return "";
  return files
    .map((f) => `## Reference: ${f}\n${loadFile(`references/${f}`)}`)
    .join("\n\n---\n\n");
}

export function register(server: McpServer): void {
  server.tool(
    "modifier_check",
    "Validate and suggest modifiers for CPT/HCPCS claim lines. Checks all modifier categories (surgical, E&M, anesthesia, radiology, lab, DME, drug, anatomical, telehealth, NCCI bundling). Provide claim lines with existing modifiers, encounter note, date of service, and payer type.",
    {
      encounter_note: z
        .string()
        .describe(
          "Clinical encounter note (SOAP note, op report, H&P, etc.) used to determine clinical necessity for each modifier"
        ),
      claim_lines: z
        .array(
          z.object({
            code: z.string().describe("CPT or HCPCS procedure code"),
            modifiers: z
              .array(z.string())
              .default([])
              .describe("Existing modifiers on this claim line, if any"),
          })
        )
        .describe("Claim line items to evaluate"),
      date_of_service: z
        .string()
        .optional()
        .describe("Date of service in YYYY-MM-DD format"),
      payer: z
        .string()
        .optional()
        .describe(
          "Payer type or name (e.g. 'Medicare', 'Medicaid', 'Blue Cross') — affects bilateral billing method and modifier rules"
        ),
    },
    async ({ encounter_note, claim_lines, date_of_service, payer }) => {
      const skillInstructions = loadFile("SKILL.md");
      const references = loadReferences();

      const claimLinesFormatted = claim_lines
        .map((line) => {
          const mods =
            line.modifiers.length > 0
              ? ` [modifiers: ${line.modifiers.join(", ")}]`
              : " [no modifiers]";
          return `- ${line.code}${mods}`;
        })
        .join("\n");

      const inputs = [
        `## Encounter Inputs`,
        `**Encounter Note:**\n${encounter_note}`,
        `**Claim Lines:**\n${claimLinesFormatted}`,
        date_of_service ? `**Date of Service:** ${date_of_service}` : "",
        payer ? `**Payer:** ${payer}` : "",
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
