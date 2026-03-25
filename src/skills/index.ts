import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SkillModule } from "../types.js";

import * as catalog from "./_catalog.skill.js";
import * as helloWorld from "./hello-world.skill.js";
import * as textTransform from "./text-transform.skill.js";
import * as jsonUtils from "./json-utils.skill.js";

const skills: SkillModule[] = [
  helloWorld,
  textTransform,
  jsonUtils,
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
