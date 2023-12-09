import { appLibrary, processes } from "$ts/stores/apps";

export function spawnProcess(appId: string): boolean {
  const library = appLibrary.get();
  const procs = processes.get();

  if (!library[appId]) return false;

  const pid = Math.floor(Math.random() * 1e9); // 0 - 1000000000

  if (procs[pid]) return spawnProcess(appId) // Try to get another pid

  procs[pid] = { ...library[appId] };

  processes.set(procs);

  return true;
}

export function killProcess(pid: number): boolean {
  const procs = processes.get();

  if (!procs[pid]) return false;

  // TODO: Try to close the window and check if it's okay to remove the process from the store

  // Set it to disposed to prevent the Window Inheritance Bug that delayed v5 (svelte moment)
  procs[pid] = "disposed"

  processes.set(procs);
}