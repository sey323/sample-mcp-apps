import { App } from "@modelcontextprotocol/ext-apps";

const app = new App({ name: "Get Time App", version: "1.0.0" });

let isConnected = false;

export async function connectMcpApp() {
  if (isConnected) {
    return;
  }

  app.connect();
  isConnected = true;
}

export async function getServerTime() {
  const result = await app.callServerTool({ name: "get-time", arguments: {} });
  return result.content?.find((c) => c.type === "text")?.text ?? "[ERROR]";
}
