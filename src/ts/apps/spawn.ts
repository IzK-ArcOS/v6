import { Process, ProcessHandler } from "$ts/process";
import { appLibrary } from "$ts/stores/apps";
import { ProcessStack } from "$ts/stores/process";
import { App } from "$types/app";
import { getAppById } from "./utils";

export function spawnApp(id: string): boolean {
  const library = appLibrary.get();

  if (!library.has(id)) return false;

  class AppProcess extends Process {
    constructor(handler: ProcessHandler, pid: number, name: string, app: App) {
      super(handler, pid, name, app)
    }
  }

  ProcessStack.spawn(AppProcess, `aProc#${id}`, library.get(id))
}