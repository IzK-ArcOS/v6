import { createTrayIcon, disposeTrayIcon } from "$apps/Shell/ts/tray";
import { getAppById, spawnApp, spawnOverlay } from "$ts/apps";
import { SecurityHighIcon } from "$ts/images/general";
import { sendNotification } from "$ts/notif";
import { Process, ProcessHandler } from "$ts/process";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { ProcessStack } from "$ts/stores/process";
import { UserDataStore } from "$ts/stores/user";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import { App, AppSpawnResult } from "$types/app";
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

    const userdata = UserDataStore.get();

    if (userdata.sh.bypassElevation) this.bypassWarning();
  }

  public async GetUserElevation(data: ElevationData): Promise<boolean> {
    this.Log(`Getting user elevation: ${data.what}`);

    if (this.pauseCheck()) return false;

    const id = Math.floor(Math.random() * 1e6);
    const shellPid = ProcessStack.getAppPids("ArcShell")[0];
    const app = getAppById("SecureContext");
    const userdata = UserDataStore.get();

    if (userdata.sh.bypassElevation) return true;

    if (!app) return false;

    let proc: number | AppSpawnResult | Process | false;

    if (!shellPid) {
      proc = await spawnApp("SecureContext", 0, [id, data]);
    } else {
      proc = await spawnOverlay(app, shellPid || 0, [id, data]);
    }

    if (!proc || typeof proc == "string") return false;

    return new Promise((resolve) => {
      GlobalDispatch.subscribe("elevation-accept", (data) => {
        if (!data[0] || data[0] !== id) return;

        this.Log(`Approving ID ${id}`);

        resolve(true);
      });

      GlobalDispatch.subscribe("elevation-reject", (data) => {
        if (!data[0] || data[0] !== id) return;

        this.Log(`Denying ID ${id}`);

        resolve(false);
      });
    });
  }

  public async bypassWarning() {
    await sleep(1000);

    function notif() {
      sendNotification({
        title: "Elevation is disabled",
        message:
          "ArcOS is currently not preventing any elevated requests from running without your permission. It is recommended to leave Elevation <b>enabled</b>. Click the button to solve this problem.",
        buttons: [
          {
            caption: "Re-enable elevation",
            action() {
              UserDataStore.update((v) => {
                v.sh.bypassElevation = false;

                return v;
              });
            },
          },
        ],
        image: SecurityHighIcon,
      });
    }

    notif();

    const id = `svc#ElevationService_disabledNotifier`;

    createTrayIcon({
      title: "Elevation is disabled",
      image: SecurityHighIcon,
      identifier: id,
      onOpen() {
        disposeTrayIcon(id);
        notif();
      },
    });
  }
}

export const ElevationService: Service = {
  name: "Elevation Serice",
  description: "Manages the ArcOS Secure Context",
  process: ES,
  initialState: "started",
};
