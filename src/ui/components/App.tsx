import { useCallback, useEffect, useState } from "preact/hooks";

import { connectMcpApp, getServerTime } from "../services/mcpClient";

export function App() {
  const [serverTime, setServerTime] = useState("Loading...");

  useEffect(() => {
    connectMcpApp();
  }, []);

  const handleGetTimeClick = useCallback(async () => {
    const time = await getServerTime();
    setServerTime(time);
  }, []);

  return (
    <main>
      <section className="time" aria-live="polite">
        <span>サーバー時間:</span>
        <code>{serverTime}</code>
      </section>
      <p className="hint">ボタンを押すとサーバー時間を更新します。</p>
      <button type="button" onClick={handleGetTimeClick}>
        現在のサーバー時間を取得
      </button>
    </main>
  );
}
