import { Log } from "$ts/console";
import { ProcessStack } from "$ts/stores/process";

export async function killAllAppInstances(id: string) {
  Log("process/kill", `Killing all instances of ${id}`);

  const pids = ProcessStack.getAppPids(id);

  for (const pid of pids) {
    ProcessStack.kill(pid);
  }
} 