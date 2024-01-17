import { Log } from "$ts/console";
import { GetUserElevation } from "$ts/elevation";
import { ElevationKillAppProcesses } from "$ts/stores/elevation";
import { ProcessStack } from "$ts/stores/process";

export async function killAllAppInstances(id: string, fromSystem = false): Promise<boolean> {
  Log("process/kill", `Killing all instances of ${id}`);

  const pids = ProcessStack.getAppPids(id);
  const elevated = fromSystem || await GetUserElevation(ElevationKillAppProcesses(id), ProcessStack)

  if (!elevated) return false;

  for (const pid of pids) {
    ProcessStack.kill(pid, elevated);
  }

  return true
} 