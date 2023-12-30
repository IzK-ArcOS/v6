import { Log } from "$ts/console";
import { Process, ProcessHandler } from "$ts/process";
import { focusedPid } from "$ts/stores/apps";
import { ProcessStack } from "$ts/stores/process";
import { App } from "$types/app";
import { getAppById } from "./utils";

export function spawnApp(id: string, parent?: number, args?: any[], processHandler = ProcessStack): boolean {
  Log("apps/spawn", `Spawning app with ID ${id} on handler ${processHandler.id}`);
  class AppProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[] = []) {
      super(handler, pid, name, app, args);

      this.setParentPid(parent);
    }
  }

  const app = getAppById(id);
  const closedPids = processHandler.closedPids.get();
  const instances = processHandler.getAppPids(id).filter((p) => !closedPids.includes(p));

  if (app.singleInstance && instances.length) {
    focusedPid.set(instances[0]);

    return true;
  }

  processHandler.spawn({
    proc: AppProcess,
    name: `app#${id}`,
    app,
    args
  });

  return true;
}

export function spawnOverlay(app: App, parent: number, args?: any[], processHandler = ProcessStack) {
  Log("apps/spawn", `Spawning overlay with ID ${app.id} on handler ${processHandler.id}`);

  app = { ...app, isOverlay: true };

  if (!processHandler.isPid(parent)) return false;

  class OverlayProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[] = []) {
      super(handler, pid, name, app, args);

      this.setParentPid(parent);
    }
  }

  processHandler.spawn({ proc: OverlayProcess, name: `overlay#${app.id}`, app, args });
}
