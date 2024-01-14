import { Log } from "$ts/console";
import { NotificationProcess } from "$ts/services/ns";
import { LogLevel } from "$types/console";
import { Notification } from "$types/notif";

let notifProc: NotificationProcess = null;

function procCheck() {
  if (!notifProc) Log(`notif/interact`, `Can't handle notifications without a NotificationService to interact with.`, LogLevel.error);

  return !!notifProc;
}

export const getNotificationStore = () => notifProc ? notifProc.store : null;
export const getNotifCurrentStore = () => notifProc ? notifProc.current : null;

export function setNotificationProc(proc: NotificationProcess) {
  Log(`notif/interact`, `Setting notification process to ${proc.pid}`);

  if (!proc) return Log("notif/interact", "Can't set NotifProc to invalid process!", LogLevel.error);

  notifProc = proc;
}

export async function sendNotification(data: Notification) {
  if (!procCheck()) return;

  return await notifProc.send(data);
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
  console.log("clearNotifications")
  if (!procCheck()) return;
  console.log("procCheck finished")


  notifProc.store.set(new Map([]))
}

export function isNotificationServiceActive() {
  return notifProc && !notifProc._disposed && !notifProc._paused
}