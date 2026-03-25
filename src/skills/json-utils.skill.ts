import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent, jsonContent } from "../lib/format.js";
import { errorContent } from "../lib/errors.js";

export const metadata = {
  name: "json-utils",
  description: "JSON validation and formatting utilities",
  version: "1.0.0",
};

export function register(server: McpServer): void {
  server.tool(
    "json_validate",
    "Validate whether a string is valid JSON and report errors",
    { input: z.string().describe("The string to validate as JSON") },
    async ({ input }) => {
      try {
        JSON.parse(input);
        return jsonContent({ valid: true, error: null });
      } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown parse error";
        return jsonContent({ valid: false, error: message });
      }
    }
  );

  server.tool(
    "json_format",
    "Pretty-print JSON with configurable indentation",
    {
      input: z.string().describe("The JSON string to format"),
      indent: z
        .number()
        .int()
        .min(1)
        .max(8)
        .default(2)
        .describe("Number of spaces for indentation"),
    },
    async ({ input, indent }) => {
      try {
        const parsed = JSON.parse(input);
        return textContent(JSON.stringify(parsed, null, indent));
      } catch (e) {
        const message = e instanceof Error ? e.message : "Unknown parse error";
        return errorContent(`Invalid JSON: ${message}`);
      }
    }
  );
}
