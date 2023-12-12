import { Log } from "$ts/console";
import { closedPids, processes } from "$ts/stores/apps";
import { UserDataStore } from "$ts/stores/user";
import { sleep } from "$ts/util";
import { LogLevel } from "$types/console";
import { UserData } from "$types/user";

export async function closeWindow(pid: number): Promise<boolean> {
  Log("apps/close", `Closing window of PID ${pid}...`)
  const procs = processes.get();
  const udata = UserDataStore.get() as UserData;
  const cpids = closedPids.get();

  if (!procs.has(pid) || cpids.includes(pid)) {
    Log("apps/close", `Failed to close window ${pid}: no such process.`, LogLevel.error)

    return false;
  }

  closedPids.update((v) => { // This tells the window instance that it's closing
    v.push(pid);

    return v;
  });

  await sleep(udata.sh.anim ? 300 : 0); // Wait for the close animation to finish

  return true;
}