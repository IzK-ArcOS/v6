import { BrowserCheck } from "$state/Desktop/ts/browsercheck";
import { UserDataCommitter } from "$state/Desktop/ts/userdata";
import { NotificationService } from "$ts/notif";
import { ProcessSpawnArguments } from "$types/process";

export const StartupServices: ProcessSpawnArguments[] = [
  {
    proc: UserDataCommitter,
    name: "UserDataCommitter",
  },
  {
    proc: NotificationService,
    name: "NotificationService",
  },
  {
    proc: BrowserCheck,
    name: "BrowserCheck"
  }
]