import { ServiceManager } from "$ts/service";
import { ProcessSpawnArguments } from "$types/process";

export const StartupServices: ProcessSpawnArguments[] = [
  {
    proc: ServiceManager,
    name: "ServiceManager"
  },
]