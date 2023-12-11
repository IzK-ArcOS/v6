import { Log } from "$ts/console";
import { builtinApps } from "$ts/stores/apps/builtins";
import { sleep } from "$ts/util";
import { loadApp } from "./load";

export async function loadBuiltinApps() {
  Log("apps/builtins", "Loading built-in applications...")

  const entries = Object.entries(builtinApps);

  for (const [id, app] of entries) {
    await loadApp(id, app);
  }

  //await sleep(500)
}