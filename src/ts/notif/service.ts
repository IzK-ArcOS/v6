import { Process, ProcessHandler } from "$ts/process";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import { App } from "$types/app";
import { Notification, NotificationStore } from "$types/notif";
import { setNotificationProc } from "./interact";

export class NotificationService extends Process {
  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[]) {
    super(handler, pid, name, app, args);

    setNotificationProc(this);
  }

  override _pausedError: string = "Unable to handle notifications: I'm paused";
  private _timeout: ReturnType<typeof setTimeout>;
  public current = Store<string>();
  public store: NotificationStore = Store(new Map([]));


  public async send(data: Notification) {
    if (this.pauseCheck()) return;

    this.Log(`Sending: ${data.title}`)

    clearTimeout(this._timeout);

    const notifications = this.store.get();
    const id = `${Math.floor(Math.random() * 1e9)}`;

    data.timestamp = new Date().getTime();

    notifications.set(id, data);

    await sleep(0);

    this.store.set(notifications)
    this.current.set(id);

    if (!data.timeout) return id;

    this._timeout = setTimeout(() => {
      this.current.set(null);
    }, data.timeout);

    return id;
  }

  public close() {
    if (this.pauseCheck()) return;

    this.current.set(null);
  }

  public deleteNotification(id: string) {
    if (this.pauseCheck()) return;

    const notifications = this.store.get();

    notifications.delete(id);

    this.store.set(notifications);

    if (this.current.get() == id) this.close();
  }
}
