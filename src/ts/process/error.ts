import { ErrorDialog as AppData } from "$apps/ErrorDialog/ts/app";
import { ProcessStack } from "$ts/stores/process";
import { App } from "$types/app";
import { ErrorDialog } from "$types/error";
import { ProcessHandler } from "./handler";
import { Process } from "./instance";

export function createErrorDialog(options: ErrorDialog, parentPid: number, overlay?: boolean) {
  class DialogProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app?: App, ...args: any[]) {
      super(handler, pid, name, app, ...args);

      this.setParentPid(pid);
    }
  }

  const app = { ...AppData, isOverlay: overlay }

  ProcessStack.spawn({ proc: DialogProcess, parentPid, name: `error#${parentPid}`, args: options, app })
} 