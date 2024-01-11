import { Log } from "$ts/console";
import { LogLevel } from "$types/console";

export class GlobalDispatcher {
  public subscribers: Record<string, Record<number, (data: unknown) => void>> = {};

  constructor() {
    this.Log("Creating new GlobalDispatcher")
  }

  private Log(text: string, level?: LogLevel) {
    Log("process/dispatch", `GlobalDispatcher: ${text}`, level)
  }

  subscribe<T = any[]>(event: string, callback: (data: T) => void) {
    const id = Math.floor(Math.random() * 1e6);

    if (!this.subscribers[event]) this.subscribers[event] = {}

    if (this.subscribers[event][id]) return this.subscribe(event, callback); // get another ID

    this.Log(`Subscribing on ID ${id} to event ${event}`);

    if (!this.subscribers[event]) this.subscribers[event] = { [id]: callback };
    else this.subscribers[event][id] = callback;

    return id;
  }

  unsubscribeId(event: string, id: number) {
    this.Log(`Unsubscribing ID ${id} of event ${event}`);

    delete this.subscribers[event][id];
  }

  discardEvent(event: string) {
    this.Log(`Discarding event ${event}`);

    delete this.subscribers[event];
  }

  dispatch<T = any[]>(caller: string, data?: T) {
    this.Log(`Dispatching ${caller}`);

    const callers = this.subscribers[caller];

    if (!callers) return;

    const callbacks = [...Object.values(callers)];

    for (const callback of callbacks) {
      callback(data);
    }
  }
}

export const GlobalDispatch = new GlobalDispatcher();
