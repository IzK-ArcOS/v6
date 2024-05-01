import { Log } from "$ts/console";
import { GetUserElevation } from "$ts/elevation";
import { Process, ProcessHandler } from "$ts/process";
import { focusedPid } from "$ts/stores/apps/focus";
import { ElevatedAppLaunchData } from "$ts/stores/elevation";
import { ProcessStack } from "$ts/stores/process";
import { App, AppSpawnResult } from "$types/app";
import { LogLevel } from "$types/console";
import { getAppById } from "./utils";

export async function spawnApp(
  id: string,
  parent?: number,
  args?: any[],
  processHandler = ProcessStack,
  data: App = null
): Promise<number | AppSpawnResult> {
  const proc = await Spawn(id, parent, args, processHandler, data, false);

  if (typeof proc == "string") return proc;

  return proc.pid;
}

export async function spawnOverlay(
  app: App,
  parent: number,
  args?: any[],
  noShade?: boolean,
  processHandler = ProcessStack
): Promise<Process | AppSpawnResult> {
  if (!app) return;

  app = getAppById(null, { ...app, noOverlayShade: noShade });

  return await Spawn(app.id, parent, args, processHandler, app, true);
}

export async function Spawn(
  id: string,
  parent?: number,
  args?: any[],
  processHandler = ProcessStack,
  data: App = null,
  overlay = false
): Promise<Process | AppSpawnResult> {
  Log("apps/spawn", `Spawning ${id} on handler ${processHandler.id}`);
  class AppProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[] = []) {
      super(handler, pid, name, app, args);

      this.setParentPid(parent);
    }
  }

  let app = data || getAppById(id);
  const closedPids = processHandler.closedPids.get();
  const instances = processHandler.getAppPids(id).filter((p) => !closedPids.includes(p));

  app = getAppById(null, { ...app, isOverlay: overlay });

  if (!app) return "err_noExist";

  if (app.singleInstance && instances.length) {
    focusedPid.set(instances[0]);

    Log(
      "apps/spawn",
      `Not spawning as ${id} is SingleInstance, focussing opened instance instead.`,
      LogLevel.warn
    );

    return "err_singleInstance";
  }

  if (app.elevated) {
    const elevated = await GetUserElevation(ElevatedAppLaunchData(app), ProcessStack);

    if (!elevated) return "err_elevation";
  }

  if (app.spawnCondition) {
    const canSpawn = await app.spawnCondition();

    if (!canSpawn) return "err_spawnCondition";
  }

  const proc = await processHandler.spawn({
    proc: AppProcess,
    name: `${overlay ? "overlay" : "app"}#${id}`,
    app: app,
    args,
  });

  return proc;
}
