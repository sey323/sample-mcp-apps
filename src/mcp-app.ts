import { App } from "@modelcontextprotocol/ext-apps";

const serverTimeEl = document.getElementById("server-time")!;
const getTimeBtn = document.getElementById("get-time-btn")!;

// MCPサーバー側と接続するためのUIクライアントを作成する
const app = new App({ name: "Get Time App", version: "1.0.0" });

// `app.connect()`より前に設定する必要あり
// MCPサーバのツールの実行結果を受け取るイベント
// get-timeがresult.contentに現在時刻を設定して返却するので、その値を取得してserverTimeElに代入する
app.ontoolresult = (result) => {
  const time = result.content?.find((c) => c.type === "text")?.text;
  serverTimeEl.textContent = time ?? "[ERROR]";
};

// ボタンクリック時の挙動
getTimeBtn.addEventListener("click", async () => {
  // `app.callServerTool()`で指定したToolを実行する
  const result = await app.callServerTool({ name: "get-time", arguments: {} });
  const time = result.content?.find((c) => c.type === "text")?.text;
  serverTimeEl.textContent = time ?? "[ERROR]";
});

// ホストと接続
app.connect();