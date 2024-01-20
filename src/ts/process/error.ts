import { ErrorDialog as AppData } from "$apps/ErrorDialog/ts/app";
import { ArcSoundBus } from "$ts/soundbus";
import { ProcessStack } from "$ts/stores/process";
import { App } from "$types/app";
import { Nullable } from "$types/common";
import { ConfirmationDialog, ErrorDialog } from "$types/error";
import { ProcessHandler } from "./handler";
import { Process } from "./instance";

export async function createErrorDialog(
  options: ErrorDialog,
  parentPid: number,
  overlay?: boolean
): Promise<Nullable<number>> {
  class DialogProcess extends Process {
    constructor(
      handler: ProcessHandler,
      pid: number,
      name: string,
      app?: App,
      args: any[] = []
    ) {
      super(handler, pid, name, app, args);

      this.setParentPid(pid);
    }
  }

  const app = { ...AppData, isOverlay: overlay };

  const process = await ProcessStack.spawn({
    proc: DialogProcess,
    parentPid,
    name: `error#${parentPid}`,
    args: [options],
    app,
  });

  if (typeof process == "string") return null;

  if (options.sound) ArcSoundBus.playSound(options.sound)

  return process.pid;
}

export async function GetConfirmation(options: ConfirmationDialog, parentPid: number, overlay?: boolean): Promise<boolean> {
  return new Promise((resolve) => {
    createErrorDialog({
      ...options, buttons: [
        { caption: "No", action() { resolve(false) } },
        { caption: "Yes", action() { resolve(true) }, suggested: true }
      ]
    }, parentPid, overlay)
  })
}