import { manualCrash } from "$ts/bugrep/crash";
import { Log } from "$ts/console";
import { primaryStates } from "$ts/stores/state";
import { Store } from "$ts/writable";
import { LogLevel } from "$types/console";
import { State, States } from "$types/state";
import { StateWatcher } from "./watch";

export class StateHandler {
  public readonly current = Store<State>();
  public readonly watcher: StateWatcher;

  constructor(
    public readonly id: string,
    public readonly store: States,
    public readonly startState: string
  ) {
    Log("ts/states", `Created StateHandler "${id}"`);

    this.watcher = new StateWatcher(this);

    this.navigate(startState);
  }

  public navigate(stateKey: string) {
    Log("ts/states", `StateHandler.navigate: Navigating to "${stateKey}"`);

    if (!this.store.has(stateKey)) {
      manualCrash(
        "ts/states",
        `StateHandler.navigate: No such state ${stateKey}`
      );

      return false;
    }

    const state = this.store.get(stateKey);

    if (state.onload) state.onload();

    document.title = `ArcOS | ${state.name}`;

    this.current.set(state);

    return true;
  }
}

export const PrimaryState = new StateHandler("ArcOS", primaryStates, "boot");
