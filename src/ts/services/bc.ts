import { createTrayIcon } from "$apps/Shell/ts/tray";
import { FirefoxIcon } from "$ts/images/general";
import { sendNotification } from "$ts/notif";
import { Process, ProcessHandler } from "$ts/process";
import { PrimaryState } from "$ts/states";
import { sleep } from "$ts/util";
import { App } from "$types/app";
import { Notification } from "$types/notif";
import { Service } from "$types/service";

export class BrowserCheckProcess extends Process {
  warnings: Record<string, Notification> = {
    "firefox": {
      title: "Firefox support",
      message: "As of January 10th 2024, support for Firefox is still experimental. You can expect visual imperfections and bugs until further notice.",
      image: FirefoxIcon
    }
  }

  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[]) {
    super(handler, pid, name, app, args);
  }

  override async start() {
    await sleep(1000); // Wait for shell and NotificationService startups

    const ua = navigator.userAgent.toLowerCase();

    for (const browser in this.warnings) {
      if (!ua.includes(browser)) continue;

      const warning = this.warnings[browser];

      sendNotification(warning);

      createTrayIcon({
        title: warning.title,

        image: warning.image,
        onOpen() {
          sendNotification(warning);
        },
        identifier: `BrowserCheck_Warning#${browser}`
      })
    }
  }
}

export const BrowserCheck: Service = {
  name: "Browser Check",
  description: "Performs checks to ensure your browser is compatible",
  process: BrowserCheckProcess,
  initialState: "started",
  startCondition: () => PrimaryState.current.get().key == "desktop"
}