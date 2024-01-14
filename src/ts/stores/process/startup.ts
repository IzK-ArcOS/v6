import { ServiceManager } from "$ts/service";
import { ProcessSpawnArguments } from "$types/process";

export const StartupProcesses: ProcessSpawnArguments[] = [
  {
    proc: ServiceManager,
    name: "ServiceManager"
  },
]