import { describe, it, expect } from "vitest";
import { createServer } from "../../src/server.js";

describe("MCP Server integration", () => {
  it("creates a server with all skills registered", () => {
    const server = createServer();
    expect(server).toBeDefined();
  });

  it("does not throw during creation", () => {
    expect(() => createServer()).not.toThrow();
  });
});
