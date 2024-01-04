import { Log } from "$ts/console";
import { LogLevel } from "$types/console";
import { Notification } from "$types/notif";
import { NotificationService } from "./service";

let notifProc: NotificationService = null;

function procCheck() {
  if (!notifProc) Log(`notif/interact`, `Can't handle notifications without a NotificationService to interact with.`, LogLevel.error);

  return !!notifProc;
}

export const getNotificationStore = () => notifProc ? notifProc.store : null;
export const getNotifCurrentStore = () => notifProc ? notifProc.current : null;

export function setNotificationProc(proc: NotificationService) {
  Log(`notif/interact`, `Setting notification process to ${proc.pid}`);

  if (!proc) return;

  notifProc = proc;
}

export function sendNotification(data: Notification) {
  if (!procCheck()) return;

  notifProc.send(data);
}

export function closeNotification() {
  if (!procCheck()) return;

  notifProc.close()
}

export function deleteNotification(id: string) {
  if (!procCheck()) return;

  notifProc.deleteNotification(id);
}

export function clearNotifications() {
  if (!procCheck()) return;

  notifProc.store.set(new Map([]))
}