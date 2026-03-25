import { describe, it, expect } from "vitest";
import { metadata, register } from "../../src/skills/hello-world.skill.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

describe("hello-world skill", () => {
  it("exports correct metadata", () => {
    expect(metadata.name).toBe("hello-world");
    expect(metadata.version).toBe("1.0.0");
    expect(metadata.description).toBeTruthy();
  });

  it("registers without throwing", () => {
    const server = new McpServer({ name: "test", version: "0.0.0" });
    expect(() => register(server)).not.toThrow();
  });
});
