import "$css/main.css";
import { AcceleratorHandler } from "$ts/apps/keyboard";
import { setCrashHooks } from "$ts/bugrep/hooks";
import { setLoggingHooks } from "$ts/console/hooks";
import App from "./App.svelte";

AcceleratorHandler

document.addEventListener("contextmenu", (e) => e.preventDefault());

setLoggingHooks();
setCrashHooks();

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
