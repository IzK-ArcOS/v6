import { manualCrash } from "$ts/bugrep/crash";
import { Log } from "$ts/console";
import { appLibrary } from "$ts/stores/apps";
import { sleep } from "$ts/util";
import { App } from "$types/app";
import { LogLevel } from "$types/console";
import { spawnApp } from "./spawn";

export async function loadApp(id: string, data: App): Promise<boolean> {
  Log("apps/load", `Loading application ${id}`);
  const library = appLibrary.get();

  if (library.has(id)) {
    Log(
      "apps/load",
      `Loading ${id} failed because an application with the same ID already exists`,
      LogLevel.error
    );

    return false;
  }

  library.set(id, Object.create(data));

  await sleep(100);

  appLibrary.set(library);

  if (data.metadata.core) spawnApp(id);

  return true;
}

export async function loadExternal(
  tag: string,
  module: string,
  app: App
): Promise<boolean> {
  app.sideload = { tag, module };
  app.content = null;
  app.id = tag;

  try {
    await import(/* @vite-ignore */ module);
  } catch {
    manualCrash("src/ts/apps/load.ts", "loading external app failed, CORS?");
  }

  const loaded = loadApp(tag, app);

  return loaded;
}
