import { Log } from "$ts/console";
import { appLibrary, processes } from "$ts/stores/apps";
import { LogLevel } from "$types/console";
import { closeWindow } from "./close";

export function spawnProcess(appId: string): number {
  Log("apps/process", `Spawning process ${appId}...`)
  const library = appLibrary.get();
  const procs = processes.get();

  if (!library[appId]) return -1;

  const pid = Math.floor(Math.random() * 1e9); // 0 - 1000000000

  if (procs[pid]) return spawnProcess(appId) // Try to get another pid

  console.log(library[appId])

  procs[pid] = { ...library[appId] };

  processes.set(procs);

  return pid;
}

export async function killProcess(pid: number): Promise<boolean> {
  Log(`apps/process`, `Killing process with PID ${pid}...`);

  const procs = processes.get();
  const closed = await closeWindow(pid);

  if (!closed) {
    Log(`apps/process`, `Failed to kill ${pid}: no such process`, LogLevel.error);

    return false; // PID doesn't exist, don't continue.  
  }

  // Set it to disposed to prevent the Window Inheritance Bug
  //procs[pid] = "disposed";

  //processes.set(procs);

  return true;
}

