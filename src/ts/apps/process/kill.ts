import { manualCrash } from "$ts/bugrep/crash";
import { Log } from "$ts/console";
import { processes } from "$ts/stores/apps";
import { LogLevel } from "$types/console";
import { closeWindow } from "../close";

export async function killProcess(pid: number): Promise<boolean> {
  Log(`apps/process`, `Killing process with PID ${pid}...`);

  const procs = processes.get();
  const proc = procs.get(pid);
  const isCore = proc && proc != "disposed" && proc.metadata.core;
  const closed = await closeWindow(pid, isCore);

  if (!closed) {
    Log(`apps/process`, `Failed to kill ${pid}: no such process`, LogLevel.error);

    return false; // PID doesn't exist, don't continue.  
  }

  // Set it to disposed to prevent the Window Inheritance Bug
  procs.set(pid, "disposed");

  processes.set(procs);

  if (isCore) manualCrash("src/ts/apps/process.ts", "killProcess: Attempted to kill core process. Don't do that.")

  return true;
}
