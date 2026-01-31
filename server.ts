import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fs from "node:fs/promises";
import path from "node:path";

const DIST_DIR = path.join(import.meta.dirname, "dist");

/**
 * Toolと表示するUI Resourceを登録するMCPサーバーを作成
 */
export function createServer(): McpServer {
  const server = new McpServer({
    name: "MCP App Server",
    version: "1.0.0",
  });

  // Toolに表示するUI ResourceのURIを設定。ToolとResourceの両方で同じUIを設定する
  const resourceUri = "ui://get-time/mcp-app.html";

  // UIのResourceをToolの`meta.ui.resourceUri`に設定する
  // Toolは呼び出されたとき`meta.ui.resourceUri`を参照し、UIをチャット上にレンダリングする。
  registerAppTool(
    server,
    "get-time",
    {
      title: "Get Time",
      description: "Returns the current server time.",
      inputSchema: {},
      _meta: { ui: { resourceUri } }, // Resourceの設定
    },
    async () => {
      // 日本時間を返却するTool
      const time = new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" });
      return { content: [{ type: "text", text: time }] };
    },
  );

  // 表示するUIリソースを設定。viteでビルドされた mcp-app.htmlを
  // チャット画面に表示されるResourceとして登録する
  registerAppResource(
    server,
    resourceUri,
    resourceUri,
    { mimeType: RESOURCE_MIME_TYPE },
    async () => {
      const html = await fs.readFile(path.join(DIST_DIR, "mcp-app.html"), "utf-8");

      return {
        contents: [
          { uri: resourceUri, mimeType: RESOURCE_MIME_TYPE, text: html },
        ],
      };
    },
  );

  return server;
}