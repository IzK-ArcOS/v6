import { Log } from "$ts/console";
import { builtinApps } from "$ts/stores/apps/builtins";
import { loadApp } from "./load";

export function loadBuiltinApps() {
  Log("apps/builtins", "Loading built-in applications...")

  const entries = Object.entries(builtinApps);

  for (const [id, app] of entries) {
    loadApp(id, app);
  }
}