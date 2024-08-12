import { ShellPid } from "$apps/Shell/ts/triggers";
import { WarningIcon } from "$ts/images/dialog";
import { Process, ProcessHandler } from "$ts/process";
import { createErrorDialog } from "$ts/process/error";
import { stopService } from "$ts/service/interact";
import { PrimaryState } from "$ts/states";
import { ConnectedServer } from "$ts/stores/server";
import { App } from "$types/app";
import { Service } from "$types/service";

class GBS extends Process {
  INACTIVE_AFTER = new Date("2024-10-02 00:00:00").getTime();

  constructor(handler: ProcessHandler, pid: number, name: string, app?: App, args?: any[]) {
    super(handler, pid, name, app, args);
  }

  override start() {
    if (new Date().getTime() >= this.INACTIVE_AFTER) return stopService("GoodbyeService", true);

    const server = ConnectedServer.get();
    const command = `<code>$ arc-offload -s ${server.host} ${server.secure ? "-i" : ""}${
      server.authCode ? " -a [authcode]" : ""
    }</code>`;

    createErrorDialog(
      {
        title: "ArcOS is shutting down",
        message: `We're shutting down the ArcOS Project on <b>October 1st, 2024</b>. All ArcOS services will be taken down, including all ArcAPI's. You have until then to offload your data using ArcOffload:<br/><br/>${command}`,
        buttons: [
          { caption: "I understand", action() {} },
          {
            caption: "ArcOffload",
            action() {
              window.open("https://github.com/IzKuipers/ArcOffload");
            },
            suggested: true,
          },
        ],
        image: WarningIcon,
        sound: "arcos.dialog.error",
      },
      ShellPid(),
      true
    );
  }
}

export const GoodbyeService: Service = {
  name: "Goodbye ArcOS",
  description: "The Goodbye dialog at login",
  process: GBS,
  initialState: "started",
  startCondition: () => PrimaryState.current.get().key == "desktop",
};
