import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent } from "../lib/format.js";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const metadata = {
  name: "medical-necessity-checker",
  description:
    "Validates medical necessity of CPT/HCPCS codes via ICD-CPT alignment and clinical documentation completeness against CMS guidelines",
  version: "3.0.0",
};

function loadSkillMd(): string {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const skillPath = resolve(
    __dirname,
    "../../skills/medical-necessity-checker/SKILL.md"
  );
  return readFileSync(skillPath, "utf-8");
}

export function register(server: McpServer): void {
  server.tool(
    "medical_necessity_check",
    "Check medical necessity of CPT codes against ICD-10 diagnoses for CMS compliance. Validates ICD-CPT alignment and documentation completeness. Provide encounter data in FHIR format or as individual fields.",
    {
      encounter_note: z
        .string()
        .optional()
        .describe("Clinical encounter note (SOAP, H&P, etc.)"),
      cpt_codes: z
        .array(z.string())
        .describe("CPT/HCPCS codes to validate"),
      icd_codes: z
        .array(z.string())
        .describe("ICD-10-CM diagnosis codes on the encounter"),
      patient_age: z.number().int().optional().describe("Patient age in years"),
      patient_sex: z
        .enum(["male", "female", "other"])
        .optional()
        .describe("Patient sex"),
      encounter_type: z
        .string()
        .optional()
        .describe("Encounter type (e.g. 'outpatient', 'inpatient', 'office')"),
      fhir_bundle: z
        .string()
        .optional()
        .describe("Full FHIR encounter bundle as JSON string (alternative to individual fields)"),
    },
    async ({
      encounter_note,
      cpt_codes,
      icd_codes,
      patient_age,
      patient_sex,
      encounter_type,
      fhir_bundle,
    }) => {
      const skillInstructions = loadSkillMd();

      const inputs = fhir_bundle
        ? `## FHIR Encounter Bundle\n\`\`\`json\n${fhir_bundle}\n\`\`\``
        : [
            `## Encounter Inputs`,
            encounter_note
              ? `**Encounter Note:**\n${encounter_note}`
              : "",
            `**CPT Codes:** ${cpt_codes.join(", ")}`,
            `**ICD Codes:** ${icd_codes.join(", ")}`,
            patient_age !== undefined ? `**Patient Age:** ${patient_age}` : "",
            patient_sex ? `**Patient Sex:** ${patient_sex}` : "",
            encounter_type ? `**Encounter Type:** ${encounter_type}` : "",
          ]
            .filter(Boolean)
            .join("\n\n");

      return textContent(
        `${skillInstructions}\n\n---\n\n${inputs}\n\n---\n\nNow follow the skill instructions above to check medical necessity for these codes.`
      );
    }
  );
}
