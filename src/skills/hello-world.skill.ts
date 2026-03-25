import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent } from "../lib/format.js";

export const metadata = {
  name: "hello-world",
  description: "A simple greeting skill for testing connectivity",
  version: "1.0.0",
};

export function register(server: McpServer): void {
  server.tool(
    "greet_user",
    "Generate a personalized greeting message",
    {
      name: z.string().describe("The name of the person to greet"),
      style: z
        .enum(["formal", "casual", "enthusiastic"])
        .default("casual")
        .describe("The greeting style"),
    },
    async ({ name, style }) => {
      const greetings = {
        formal: `Good day, ${name}. It is a pleasure to make your acquaintance.`,
        casual: `Hey ${name}! How's it going?`,
        enthusiastic: `WOW, ${name}! SO great to see you! This is AMAZING!`,
      };
      return textContent(greetings[style]);
    }
  );
}
