import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SkillModule } from "../types.js";

import * as catalog from "./_catalog.skill.js";
import * as emGenerator from "./em-generator.skill.js";
import * as icdValidator from "./icd-validator.skill.js";
import * as medicalNecessityChecker from "./medical-necessity-checker.skill.js";
import * as ncciEditChecker from "./ncci-edit-checker.skill.js";

const skills: SkillModule[] = [
  emGenerator,
  icdValidator,
  medicalNecessityChecker,
  ncciEditChecker,
];

export function registerAllSkills(server: McpServer): void {
  // Populate the catalog with metadata from all skills
  catalog.setCatalog(skills.map((s) => s.metadata));
  catalog.register(server);
  console.error(`[skills] Registered: ${catalog.metadata.name}`);

  for (const skill of skills) {
    skill.register(server);
    console.error(`[skills] Registered: ${skill.metadata.name}`);
  }

  console.error(`[skills] Total: ${skills.length} skills + catalog meta-tool`);
}
