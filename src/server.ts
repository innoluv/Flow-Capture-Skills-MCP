import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAllSkills } from "./skills/index.js";

export function createServer(): McpServer {
  const server = new McpServer({
    name: "flow-capture-skills",
    version: "1.0.0",
  });

  registerAllSkills(server);

  return server;
}
