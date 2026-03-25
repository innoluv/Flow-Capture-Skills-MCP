import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerAllSkills } from "./skills/index.js";

export class FlowCodeSkillsMCP extends McpAgent {
  server = new McpServer({
    name: "flow-code-skills",
    version: "1.0.0",
  });

  async init() {
    registerAllSkills(this.server);
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/mcp" || url.pathname === "/sse") {
      return FlowCodeSkillsMCP.serve("/mcp").fetch(request, env, ctx);
    }

    if (url.pathname === "/") {
      return new Response(
        JSON.stringify({
          name: "Flow Code Skills MCP",
          version: "1.0.0",
          description: "MCP server hosting modular skills for Claude Code",
          endpoints: { mcp: "/mcp", sse: "/sse" },
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response("Not Found", { status: 404 });
  },
};
