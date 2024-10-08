import { Log } from "$ts/console";
import { KnownGlobalDispatchers, SystemOnlyDispatches } from "$ts/stores/process/dispatch";
import { LogLevel } from "$types/console";
import { GlobalDispatchResult } from "$types/dispatch";

export class GlobalDispatcher {
  public subscribers: Record<string, Record<number, (data: unknown) => void>> = {};

  constructor() {
    this.Log("Creating new GlobalDispatcher");
  }

  private Log(text: string, level?: LogLevel) {
    Log("process/dispatch/global", `GlobalDispatcher: ${text}`, level);
  }

  subscribe<T = any[]>(event: string, callback: (data: T) => void) {
    const id = Math.floor(Math.random() * 1e6);

    if (!this.subscribers[event]) this.subscribers[event] = {};

    if (this.subscribers[event][id]) return this.subscribe(event, callback); // get another ID

    this.Log(`Subscribing on ID ${id} to event ${event}`);

    if (!this.subscribers[event]) this.subscribers[event] = { [id]: callback };
    else this.subscribers[event][id] = callback;

    if (!KnownGlobalDispatchers.includes(event))
      this.Log(
        `Subscribing to unknown event ${event} on Global Dispatch. Don't do that.`,
        LogLevel.warn
      );

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

  dispatch<T = any[]>(caller: string, data?: T, system = true): GlobalDispatchResult {
    this.Log(`Dispatching ${caller}`);

    const callers = this.subscribers[caller];

    if (!system && SystemOnlyDispatches.includes(caller)) {
      this.Log("Not allowing user to dispatch system-only event", LogLevel.error);

      return "err_systemOnly";
    }

    if (!callers) return "err_unknownCaller";

    const callbacks = [...Object.values(callers)];

    for (const callback of callbacks) {
      callback(data);
    }

    if (!KnownGlobalDispatchers.includes(caller))
      this.Log(
        `Dispatching unknown event ${caller} over Global Dispatch. Don't do that.`,
        LogLevel.warn
      );

    return "success";
  }
}

export const GlobalDispatch = new GlobalDispatcher();
