import { manualCrash } from "$ts/bugrep/crash";
import { Log } from "$ts/console";
import { WarningIcon } from "$ts/images/dialog";
import { createErrorDialog } from "$ts/process/error";
import { killAllAppInstances } from "$ts/process/kill";
import { appLibrary } from "$ts/stores/apps";
import { sleep } from "$ts/util";
import { App } from "$types/app";
import { LogLevel } from "$types/console";
import { spawnApp } from "../spawn";
import { appDependenciesMatch } from "./dependencies";
import { loadConditionFailed } from "./fail";

export async function loadApp(id: string, data: App): Promise<boolean> {
  Log("apps/load", `Loading application ${id}`);

  const library = appLibrary.get();

  if (library.has(id)) {
    Log(
      "apps/load",
      `${id} failed because an application with the same ID already exists`,
      LogLevel.error
    );

    return false;
  }

  const allowLoad = data.loadCondition ? await data.loadCondition() : true;
  const dependenciesMatch = appDependenciesMatch(data.metadata.dependendsOn || []);

  if (!allowLoad) {
    loadConditionFailed(data);

    return false;
  }

  if (!dependenciesMatch) {
    createErrorDialog(
      {
        title: "Dependency failure",
        message: `Application ${id} failed to load because one or more of the applications it depends on aren't loaded.`,
        image: WarningIcon,
        buttons: [{ caption: "Okay", action() {} }],
      },
      0
    );
    Log(
      `apps/load`,
      `Dependency check for ${id} failed: One of the following applications is missing: ${data.metadata.dependendsOn.join(
        ", "
      )}`,
      LogLevel.error
    );

    return false;
  }

  library.set(id, data);

  await sleep();

  appLibrary.set(library);

  if (data.metadata.core) spawnApp(id);

  return true;
}

export async function loadExternal(tag: string, module: string, app: App): Promise<boolean> {
  app.sideload = { tag, module };
  app.content = null;
  app.id = tag;

  try {
    await import(/* @vite-ignore */ module);
  } catch {
    manualCrash("src/ts/apps/load.ts", "loading external app failed, CORS?");
  }

  const loaded = await loadApp(tag, app);

  return loaded;
}

export async function unloadApp(id: string) {
  Log("apps/load", `Unloading application ${id}`);

  await killAllAppInstances(id);

  const library = appLibrary.get();

  library.delete(id);
  appLibrary.set(library);
}
