import { getAppById, spawnApp, spawnOverlay } from "$ts/apps";
import { Process, ProcessHandler } from "$ts/process";
import { GlobalDispatch, GlobalDispatcher } from "$ts/process/dispatch/global";
import { ProcessStack } from "$ts/stores/process";
import { Store } from "$ts/writable";
import { App } from "$types/app";
import { ElevationData } from "$types/elevation";
import { Service } from "$types/service";

export const ElevationPid = Store<number>();

export class ES extends Process {
  public _pausedError: string = "Can't elevate: I'm paused!";

  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[]) {
    super(handler, pid, name, app, args);
  }

  public start() {
    ElevationPid.set(this.pid);
  }

  public async GetUserElevation(data: ElevationData): Promise<boolean> {
    if (this.pauseCheck()) return false;

    const id = Math.floor(Math.random() * 1e6);
    const shellPid = ProcessStack.getAppPids("ArcShell")[0];

    const app = getAppById("SecureContext");

    if (!app) return false;

    let proc: number | Process | false;

    if (!shellPid) {
      proc = await spawnApp("SecureContext", 0, [id, data])
    } else {
      proc = await spawnOverlay(app, shellPid || 0, [id, data]);
    }

    if (!proc) return false;

    return new Promise((resolve) => {
      GlobalDispatch.subscribe("elevation-accept", (data) => {
        if (data[0] && data[0] === id) resolve(true);
      });

      GlobalDispatch.subscribe("elevation-reject", (data) => {
        if (data[0] && data[0] === id) resolve(false);
      });
    });
  }
}

export const ElevationService: Service = {
  name: "Elevation Serice",
  description: "Manages the ArcOS Secure Context",
  process: ES,
  initialState: "started"
}