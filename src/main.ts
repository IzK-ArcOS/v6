import App from "./App.svelte";
import "$css/main.css";
import { setLoggingHooks } from "$ts/console/hooks";

setLoggingHooks();

const app = new App({
  target: document.getElementById("app")!,
});

export default app;
