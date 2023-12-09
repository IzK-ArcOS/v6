import { manualCrash } from "$ts/bugrep/crash";
import { Log } from "$ts/console";
import { appLibrary } from "$ts/stores/apps";
import { App } from "$types/app";
import { LogLevel } from "$types/console";

export function loadApp(id: string, data: App): boolean {
  Log("apps/load", `Loading application ${id}`)
  const library = appLibrary.get();

  if (library[id]) {
    Log("apps/load", `Loading ${id} failed because an application with the same ID already exists`, LogLevel.error)

    return false;
  }

  library[id] = { ...data };

  appLibrary.set(library);

  return true;
}

export async function loadExternal(tag: string, module: string, app: App): Promise<boolean> {
  app.sideload = { tag, module };
  app.content = null;
  app.id = tag;

  try {
    await import(/* @vite-ignore */module);
  } catch {
    manualCrash("src/ts/apps/load.ts", "loading external app failed, CORS?");
  }

  const loaded = loadApp(tag, app);

  return loaded;
}