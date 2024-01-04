import "$css/main.css";
import { setCrashHooks } from "$ts/bugrep/hooks";
import { setLoggingHooks } from "$ts/console/hooks";
import App from "./App.svelte";

document.addEventListener("contextmenu", (e) => e.preventDefault());

setLoggingHooks();
setCrashHooks();

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
