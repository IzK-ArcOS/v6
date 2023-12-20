import { createTrayIcon, disposeTrayIcon } from "$apps/Shell/ts/tray";
import { TrayIcon } from "$apps/Shell/types/tray";
import { Log } from "$ts/console";
import { WarningIcon } from "$ts/images/general";
import { createErrorDialog } from "$ts/process/error";
import { ProcessStack } from "$ts/stores/process";
import { App } from "$types/app";
import { LogLevel } from "$types/console";
import { ErrorDialog } from "$types/error";

export function loadConditionFailed(app: App) {
  const shellPid = ProcessStack.getAppPids("ArcShell")[0];

  const dialog: ErrorDialog = {
    title: "App load aborted",
    message: `Loading application <code>${app.id}</code> was stopped because the necessary load condition failed. Try restarting to resolve this problem. If it persists, contact the ArcOS Team for more information.<br><br>Condition: <code>${app.loadCondition.toString()}</code>`,
    buttons: [{ caption: "Okay", action() { } }],
    image: WarningIcon,
  }

  function onOpen(icon: TrayIcon) {
    createErrorDialog(dialog, shellPid, true)

    disposeTrayIcon(icon.identifier)
  }

  if (shellPid) createTrayIcon({
    identifier: `lcFail#${app.id}`,
    image: WarningIcon,
    onOpen,
  })

  Log("apps/load", `Aborted ${app.id} because the load condition failed: ${app.loadCondition.toString()}`, LogLevel.error);
}