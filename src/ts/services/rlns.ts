import { WarningIcon } from "$ts/images/dialog";
import { ConnectIcon } from "$ts/images/general";
import { sendNotification } from "$ts/notif";
import { Process, ProcessHandler } from "$ts/process";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { App } from "$types/app";
import { Service } from "$types/service";

export class RateLimitNotifierProcess extends Process {
  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[]) {
    super(handler, pid, name, app, args);
  }

  start() {
    GlobalDispatch.subscribe("rate-limit", () => {
      this.notify();
    });
  }

  private notify() {
    if (this._paused) return;

    sendNotification({
      title: "Hold up!",
      message:
        "You've been rate limited! Apparently the server thinks you're being too fast. Please wait a minute before trying anything again.",
      image: ConnectIcon,
      timeout: 5000,
    });
  }
}

export const RateLimitNotifierService: Service = {
  name: "Rate Limit Notifier Service",
  description: "Informs you when you're rate limited",
  process: RateLimitNotifierProcess,
  initialState: "started",
};
