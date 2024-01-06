import { Log } from "$ts/console";
import { ShutdownIcon } from "$ts/images/power";
import { sendNotification } from "$ts/notif";
import { ProcessStack } from "$ts/stores/process";
import { StartupServices } from "$ts/stores/process/startup";

export async function StartCoreProcesses(restart = false, handler = ProcessStack) {
  Log("process/startup", `Starting ${StartupServices.length} core services.`);

  let startCount = 0;

  for (let i = 0; i < StartupServices.length; i++) {
    const service = StartupServices[i];
    const processes = [...handler.processes.get()]
    const sameNames = processes.filter(([_, proc]) => {
      return proc.name == service.name && !proc._disposed;
    })
    const isRunning = !!(sameNames.length)

    if (isRunning) continue;

    startCount++;

    await handler.spawn(StartupServices[i]);
  }

  if (restart && startCount) {
    sendNotification({
      title: "Processes restarted",
      message: `ArcOS has restarted ${startCount} core process${startCount == 1 ? "" : "es"} that weren't running anymore.`,
      image: ShutdownIcon,
      timeout: 2500,
    })
  }
}