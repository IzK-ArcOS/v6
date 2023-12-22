import { Process, ProcessHandler } from "$ts/process";
import { appLibrary, focusedPid } from "$ts/stores/apps";
import { ProcessStack } from "$ts/stores/process";
import { App } from "$types/app";

export function spawnApp(id: string, parent?: number): boolean {
  const library = appLibrary.get();

  if (!library.has(id)) return false;

  class AppProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app: App) {
      super(handler, pid, name, app);

      this.setParentPid(parent);
    }
  }

  const app = library.get(id);
  const closedPids = ProcessStack.closedPids.get();
  const instances = ProcessStack.getAppPids(id).filter((p) => !closedPids.includes(p));

  if (app.singleInstance && instances.length) {
    focusedPid.set(instances[0]);

    return true;
  }

  ProcessStack.spawn({
    proc: AppProcess,
    name: `app#${id}`,
    app: library.get(id),
  });

  return true;
}

export function spawnOverlay(app: App, parentPid: number) {
  app = { ...app, isOverlay: true };

  if (!ProcessStack.isPid(parentPid)) return false;

  class OverlayProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app: App) {
      super(handler, pid, name, app);

      this.setParentPid(parentPid);
    }
  }

  ProcessStack.spawn({ proc: OverlayProcess, name: `overlay#${app.id}`, app });
}
