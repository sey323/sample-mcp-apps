import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerGetTimeResource } from "./resources/registerGetTimeResource.js";
import { registerGetTimeTool } from "./tools/registerGetTimeTool.js";

/**
 * Toolと表示するUI Resourceを登録するMCPサーバーを作成
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "MCP App Server",
    version: "1.0.0",
  });

  registerGetTimeTool(server);
  registerGetTimeResource(server);

  return server;
}
