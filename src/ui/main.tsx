import { render } from "preact";

import { App } from "./components/App";

const root = document.getElementById("app");

if (!root) {
  throw new Error("#app が見つかりませんでした");
}

render(<App />, root);
