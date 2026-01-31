import { registerAppTool } from "@modelcontextprotocol/ext-apps/server";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { RESOURCE_URI } from "../constants.js";

/**
 * "Get Time" ToolをMCPサーバーに登録する
 * @param server MCPサーバーインスタンス
 */
export function registerGetTimeTool(server: McpServer) {
  // UIのResourceをToolの`meta.ui.resourceUri`に設定する
  // Toolは呼び出されたとき`meta.ui.resourceUri`を参照し、UIをチャット上にレンダリングする。
  registerAppTool(
    server,
    "get-time",
    {
      title: "Get Time",
      description: "Returns the current server time.",
      inputSchema: {},
      _meta: { ui: { resourceUri: RESOURCE_URI } },
    },
    async () => {
      // 日本時間を返却するTool
      const time = new Date().toLocaleString("ja-JP", {
        timeZone: "Asia/Tokyo",
      });
      return { content: [{ type: "text", text: time }] };
    },
  );
}
