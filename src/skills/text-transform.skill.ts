import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { SkillModule } from "../types.js";
import { textContent, jsonContent } from "../lib/format.js";

export const metadata = {
  name: "text-transform",
  description: "Text transformation and analysis utilities",
  version: "1.0.0",
};

export function register(server: McpServer): void {
  server.tool(
    "text_to_slug",
    "Convert text into a URL-friendly slug",
    { text: z.string().describe("The text to slugify") },
    async ({ text }) => {
      const slug = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      return textContent(slug);
    }
  );

  server.tool(
    "text_count_words",
    "Count words, characters, sentences, and paragraphs in text",
    { text: z.string().describe("The text to analyze") },
    async ({ text }) => {
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const characters = text.length;
      const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length;
      const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim()).length;
      return jsonContent({ words, characters, sentences, paragraphs });
    }
  );

  server.tool(
    "text_extract_emails",
    "Extract all email addresses from text",
    { text: z.string().describe("The text to search for emails") },
    async ({ text }) => {
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const emails = [...new Set(text.match(emailRegex) || [])];
      return jsonContent({ count: emails.length, emails });
    }
  );
}
