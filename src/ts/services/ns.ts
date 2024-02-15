import { setNotificationProc } from "$ts/notif/interact";
import { Process, ProcessHandler } from "$ts/process";
import { PrimaryState } from "$ts/states";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import { App } from "$types/app";
import { Notification, NotificationStore } from "$types/notif";
import { Service } from "$types/service";

export class NotificationProcess extends Process {
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

    this.Log(`Sending: ${data.title}`);

    clearTimeout(this._timeout);

    const notifications = this.store.get();
    const id = `${Math.floor(Math.random() * 1e9)}`;

    data.timestamp = new Date().getTime();

    notifications.set(id, data);

    await sleep();

    this.store.set(notifications);
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

  public stop() {
    this._paused = true;
    this.close();
    this.store.set(null);

    return true;
  }

  public deleteNotification(id: string) {
    if (this.pauseCheck()) return;

    const notifications = this.store.get();

    notifications.delete(id);

    this.store.set(notifications);

    if (this.current.get() == id) this.close();
  }
}

export const NotificationService: Service = {
  name: "Notification Service",
  description: "Handles sending, deleting and managing notifications.",
  process: NotificationProcess,
  initialState: "started",
  startCondition: () => PrimaryState.current.get().key == "desktop",
};
