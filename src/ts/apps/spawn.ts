import { Process, ProcessHandler } from "$ts/process";
import { appLibrary, focusedPid } from "$ts/stores/apps";
import { ProcessStack } from "$ts/stores/process";
import { App } from "$types/app";
import { getAppById } from "./utils";

export function spawnApp(id: string, parent?: number, processHandler = ProcessStack): boolean {
  class AppProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app: App) {
      super(handler, pid, name, app);

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
  });

  return true;
}

export function spawnOverlay(app: App, parentPid: number, processHandler = ProcessStack) {
  app = { ...app, isOverlay: true };

  if (!processHandler.isPid(parentPid)) return false;

  class OverlayProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app: App) {
      super(handler, pid, name, app);

      this.setParentPid(parentPid);
    }
  }

  processHandler.spawn({ proc: OverlayProcess, name: `overlay#${app.id}`, app });
}
