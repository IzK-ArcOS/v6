import { Log } from "$ts/console";
import { appLibrary, processes } from "$ts/stores/apps";

export function spawnProcess(appId: string): number {
  Log("apps/process/spawn", `Spawning process ${appId}...`)
  const library = appLibrary.get();
  const procs = processes.get();

  if (!library.has(appId)) return -1;

  const pid = Math.floor(Math.random() * 1e6); // 0 - 1000000

  if (procs.has(pid)) return spawnProcess(appId) // Try to get another pid

  procs.set(pid, Object.create(library.get(appId)));

  processes.set(procs);

  return pid;
}