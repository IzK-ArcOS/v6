import { ArcUpdateService } from "$ts/services/aus";
import { BrowserCheck } from "$ts/services/bc";
import { MessageNotifierService } from "$ts/services/mns";
import { NotificationService } from "$ts/services/ns";
import { RateLimitNotifierService } from "$ts/services/rlns";
import { ElevationService } from "$ts/services/sc";
import { UserDataCommitter } from "$ts/services/udc";
import { ServiceStore } from "$types/service";

export const serviceStore: ServiceStore = new Map([
  ["UserDataCommitter", UserDataCommitter],
  ["NotificationService", NotificationService],
  ["BrowserCheck", BrowserCheck],
  ["ElevationService", ElevationService],
  ["RateLimitNotifierService", RateLimitNotifierService],
  ["MessageNotifierService", MessageNotifierService],
  ["ArcUpdateService", ArcUpdateService],
]);
