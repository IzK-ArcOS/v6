import { Log } from "$ts/console";
import { LogLevel } from "$types/console";

export class ProcessDispatcher {
  public subscribers: Record<number, Record<string, ((data: unknown) => void)[]>> = {};

  constructor(public handler) {
    this.Log("Creating new ProcessDispatcher");
  }

  private Log(text: string, level?: LogLevel) {
    Log("process/dispatch", `ProcessDispatcher[${this.handler.id}]: ${text}`, level)
  }

  subscribe<T = any[]>(pid: number, event: string, callback: (data: T) => void) {
    if (!this.subscribers[pid]) this.subscribers[pid] = { [event]: [] };

    if (!this.subscribers[pid][event])
      this.subscribers[pid][event] = [callback]
    else this.subscribers[pid][event].push(callback);
  }

  unsubscribe(pid: number) {
    this.Log(`Unsubscribing all of PID ${pid}`);
    delete this.subscribers[pid]
  }

  dispatchToApp<T = any[]>(id: string, caller: string, data: T) {
    this.Log(`Dispatching ${caller} to app ${id}`);

    const pids = this.handler.getAppPids(id);

    for (const pid of pids) {
      const pidSubscribers = this.subscribers[pid];

      if (!pidSubscribers || !pidSubscribers[caller]) continue;

      const callers = pidSubscribers[caller];

      for (const event of callers) {
        event(data);
      }
    }
  }

  dispatchToPid<T = any>(pid: number, caller: string, data?: T) {
    this.Log(`Dispatching ${caller} to PID ${pid}`);

    const pidSubscribers = this.subscribers[pid];

    if (!pidSubscribers || !pidSubscribers[caller]) return;

    const callers = pidSubscribers[caller];

    for (const event of callers) {
      event(data);
    }
  }
}