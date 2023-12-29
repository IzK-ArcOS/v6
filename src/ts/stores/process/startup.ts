import { UserDataCommitter } from "$state/Desktop/ts/userdata";
import { ProcessSpawnArguments } from "$types/process";

export const StartupServices: ProcessSpawnArguments[] = [
  {
    proc: UserDataCommitter,
    name: "UserDataCommitter",
  },
  /*   {
      proc: NotificationService,
      name: "NotificationService",
    } */
]