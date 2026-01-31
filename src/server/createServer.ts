import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetTimeResource } from "./resources/registerGetTimeResource.js";
import { registerGetTimeTool } from "./tools/registerGetTimeTool.js";

/**
 * Creates a new MCP server instance with tools and resources registered.
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "Quickstart MCP App Server",
    version: "1.0.0",
  });

  registerGetTimeTool(server);
  registerGetTimeResource(server);

  return server;
}
