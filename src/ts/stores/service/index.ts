import { BrowserCheck } from "$ts/services/bc";
import { NotificationService } from "$ts/services/ns";
import { UserDataCommitter } from "$ts/services/udc";
import { ServiceStore } from "$types/service";

export const serviceStore: ServiceStore = new Map([
  ["UserDataCommitter", UserDataCommitter],
  ["NotificationService", NotificationService],
  ["BrowserCheck", BrowserCheck]
])