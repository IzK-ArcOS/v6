import { Log } from "$ts/console";
import { primaryStates } from "$ts/stores/state";
import { Store } from "$ts/writable";
import { LogLevel } from "$types/console";
import { State, States } from "$types/state";
import { StateWatcher } from "./watch";

export class StateHandler {
  public readonly current = Store<State>();
  public readonly watcher: StateWatcher;
  public readonly store: States;
  public readonly startState: string;
  public readonly id: string;

  constructor(id: string, store: States, startState: string, preNavigate = true) {
    this.id = id;
    this.store = store;
    this.startState = startState;
    Log(
      "states",
      `Created StateHandler "${id}" with ${store.size} states (starts at ${startState})`
    );

    this.watcher = new StateWatcher(this);

    if (preNavigate) this.navigate(startState);
  }

  public navigate(stateKey: string) {
    Log("states", `StateHandler.navigate[${this.id}]: Navigating to "${stateKey}"`);

    const has = this.store.has(stateKey);

    if (!has)
      Log(
        "states",
        `StateHandler.navigate[${this.id}]: No such state ${stateKey}, falling back to ${this.startState}`,
        LogLevel.warn
      );

    const state = this.store.get(has ? stateKey : this.startState);

    if (state.onload) state.onload();

    this.current.set(state);

    return true;
  }
}

export const PrimaryState = new StateHandler("ArcOS", primaryStates, "boot");
