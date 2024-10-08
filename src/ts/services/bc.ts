import { createTrayIcon } from "$apps/Shell/ts/tray";
import { SafeMode } from "$state/Desktop/ts/store";
import { GlobeIcon } from "$ts/images/general";
import { Process, ProcessHandler } from "$ts/process";
import { createErrorDialog } from "$ts/process/error";
import { stopService } from "$ts/service/interact";
import { PrimaryState } from "$ts/states";
import { ProcessStack } from "$ts/stores/process";
import { sleep } from "$ts/util";
import { App } from "$types/app";
import { Notification } from "$types/notif";
import { Service } from "$types/service";

export class BrowserCheckProcess extends Process {
  warnings: Record<string, Notification> = {
    "safari/,mac": {
      title: "Safari",
      message:
        "ArcOS doesn't officially support Safari. For the best experience, please resort to a Chromium-based or Firefox browser.",
      image: GlobeIcon,
      buttons: [
        {
          caption: "Chrome",
          action() {
            window.open("https://chrome.google.com/", "_blank");
          },
        },
        {
          caption: "Firefox",
          action() {
            window.open("https://mozilla.org/firefox", "_blank");
          },
        },
        {
          caption: "Ignore",
          action() {},
          suggested: true,
        },
      ],
    },
  };

  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[]) {
    super(handler, pid, name, app, args);
  }

  override async start() {
    await sleep(1000); // Wait for shell and NotificationService startups

    const ua = navigator.userAgent.toLowerCase();

    for (const browser in this.warnings) {
      const split = browser.split(",");

      if (browser.includes("safari") && !window["safari"]) continue;

      let browserApplies = true;

      for (const item of split) {
        if (!ua.includes(item)) browserApplies = false;
      }

      if (!browserApplies) continue;

      const warning = this.warnings[browser];

      function send() {
        createErrorDialog(
          { ...warning, buttons: [...(warning.buttons || [])], sound: "arcos.dialog.warning" },
          ProcessStack.getAppPids("ArcShell")[0] || 0,
          true
        );
      }

      createTrayIcon({
        title: warning.title,
        image: warning.image,
        onOpen: () => send(),
        identifier: `BrowserCheck_Warning#${browser}`,
      });

      send();
    }

    stopService("BrowserCheck", true);
  }
}

export const BrowserCheck: Service = {
  name: "Browser Check",
  description: "Performs checks to ensure your browser is compatible",
  process: BrowserCheckProcess,
  initialState: "started",
  startCondition: () => PrimaryState.current.get().key == "desktop" && !SafeMode.get(),
};
