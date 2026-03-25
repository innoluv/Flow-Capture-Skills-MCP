import { describe, it, expect } from "vitest";
import { metadata, register } from "../../src/skills/text-transform.skill.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

describe("text-transform skill", () => {
  it("exports correct metadata", () => {
    expect(metadata.name).toBe("text-transform");
    expect(metadata.version).toBe("1.0.0");
  });

  it("registers without throwing", () => {
    const server = new McpServer({ name: "test", version: "0.0.0" });
    expect(() => register(server)).not.toThrow();
  });
});
