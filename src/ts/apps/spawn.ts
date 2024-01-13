import { Log } from "$ts/console";
import { Process, ProcessHandler } from "$ts/process";
import { focusedPid } from "$ts/stores/apps";
import { ProcessStack } from "$ts/stores/process";
import { App } from "$types/app";
import { LogLevel } from "$types/console";
import { getAppById } from "./utils";

export async function spawnApp(id: string, parent?: number, args?: any[], processHandler = ProcessStack, data: App = null): Promise<number | false> {
  Log("apps/spawn", `Spawning app with ID ${id} on handler ${processHandler.id}`);
  class AppProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[] = []) {
      super(handler, pid, name, app, args);

      this.setParentPid(parent);
    }
  }

  const app = data || getAppById(id);
  const closedPids = processHandler.closedPids.get();
  const instances = processHandler.getAppPids(id).filter((p) => !closedPids.includes(p));

  if (!app) return false;

  if (app.singleInstance && instances.length) {
    focusedPid.set(instances[0]);

    Log("apps/spawn", `Not spawning as ${id} is SingleInstance, focussing opened instance instead.`, LogLevel.warn)

    return instances[0];
  }

  const proc = await processHandler.spawn({
    proc: AppProcess,
    name: `app#${id}`,
    app,
    args
  });

  if (!proc) return false;

  return proc.pid;
}

export function spawnOverlay(app: App, parent: number, args?: any[], noShade?: boolean, processHandler = ProcessStack) {
  Log("apps/spawn", `Spawning overlay with ID ${app.id} on handler ${processHandler.id}`);

  if (!app) return;

  app = { ...app, isOverlay: true, noOverlayShade: noShade };

  if (!processHandler.isPid(parent)) return false;

  class OverlayProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[] = []) {
      super(handler, pid, name, app, args);

      this.setParentPid(parent);
    }
  }

  processHandler.spawn({ proc: OverlayProcess, name: `overlay#${app.id}`, app, args });
}
