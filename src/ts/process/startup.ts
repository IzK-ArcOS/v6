import { Log } from "$ts/console";
import { ProcessStack } from "$ts/stores/process";
import { StartupServices } from "$ts/stores/process/startup";

export async function StartCoreProcesses(handler = ProcessStack) {
  Log("process/startup", `Starting ${StartupServices.length} core services.`);

  for (let i = 0; i < StartupServices.length; i++) {
    await handler.spawn(StartupServices[i]);
  }
}