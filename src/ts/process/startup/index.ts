import { Log } from "$ts/console";
import { ProcessStack } from "$ts/stores/process";
import { StartupProcesses } from "$ts/stores/process/startup";
import { CoreRestartNotification } from "./restart";

export async function StartCoreProcesses(restart = false, handler = ProcessStack) {
  Log("process/startup", `Starting ${StartupProcesses.length} core processes.`);

  let startCount = 0;

  for (const service of StartupProcesses) {
    const processes = [...handler.processes.get()]
    const sameNames = processes.filter(([_, proc]) => {
      return proc.name == service.name && !proc._disposed;
    })
    const isRunning = !!(sameNames.length)

    if (isRunning) continue;

    startCount++;

    await handler.spawn(service);
  }

  if (restart && startCount) {
    CoreRestartNotification(startCount)
  }
}