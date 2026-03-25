import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export interface SkillMetadata {
  name: string;
  description: string;
  version: string;
}

export interface SkillModule {
  metadata: SkillMetadata;
  register: (server: McpServer) => void;
}
