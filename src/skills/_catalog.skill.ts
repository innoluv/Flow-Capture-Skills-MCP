import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SkillModule, SkillMetadata } from "../types.js";
import { jsonContent } from "../lib/format.js";

export const metadata = {
  name: "_catalog",
  description: "Meta-skill that exposes the full skill catalog at runtime",
  version: "1.0.0",
};

let catalogData: SkillMetadata[] = [];

export function setCatalog(skills: SkillMetadata[]): void {
  catalogData = skills;
}

export function register(server: McpServer): void {
  server.tool(
    "list_skills",
    "Returns a catalog of all available skills and their tools. Call this first to discover what this MCP server can do.",
    {},
    async () => {
      return jsonContent({
        server: "flow-code-skills",
        skillCount: catalogData.length,
        skills: catalogData,
      });
    }
  );
}
