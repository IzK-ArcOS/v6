import "$css/main.css";
import { AppRuntime } from "$ts/apps/runtime";
import { setCrashHooks } from "$ts/bugrep/hooks";
import { setLoggingHooks } from "$ts/console/hooks";
import { ProcessHandler } from "$ts/process";
import App from "./App.svelte";
ProcessHandler
AppRuntime

setLoggingHooks();
setCrashHooks();

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
