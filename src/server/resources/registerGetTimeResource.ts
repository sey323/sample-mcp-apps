import {
  registerAppResource,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import fs from "node:fs/promises";
import path from "node:path";
import { DIST_DIR, RESOURCE_URI } from "../constants.js";

/**
 * "Get Time" UI ResourceをMCPサーバーに登録する
 * @param server MCPサーバーインスタンス
 */
export function registerGetTimeResource(server: McpServer) {
  // 表示するUIリソースを設定。viteでビルドされた mcp-app.htmlを
  // チャット画面に表示されるResourceとして登録する
  registerAppResource(
    server,
    RESOURCE_URI,
    RESOURCE_URI,
    { mimeType: RESOURCE_MIME_TYPE },
    async () => {
      const html = await fs.readFile(
        path.join(DIST_DIR, "mcp-app.html"),
        "utf-8",
      );
      return {
        contents: [
          { uri: RESOURCE_URI, mimeType: RESOURCE_MIME_TYPE, text: html },
        ],
      };
    },
  );
}
