import { manualCrash } from "$ts/bugrep/crash";
import { Log } from "$ts/console";
import { primaryStates } from "$ts/stores/state";
import { Store } from "$ts/writable";
import { State, States } from "$types/state";
import { StateWatcher } from "./watch";

export class StateHandler {
  public readonly current = Store<State>();
  public readonly watcher: StateWatcher;
  public readonly store: States;
  public readonly startState: string;
  public readonly id: string;

  constructor(
    id: string,
    store: States,
    startState: string,
    preNavigate = true
  ) {
    this.id = id;
    this.store = store;
    this.startState = startState;
    Log("states", `Created StateHandler "${id}"`);

    this.watcher = new StateWatcher(this);

    if (preNavigate) this.navigate(startState);
  }

  public navigate(stateKey: string) {
    Log(
      "states",
      `StateHandler.navigate[${this.id}]: Navigating to "${stateKey}"`
    );

    if (!this.store.has(stateKey)) {
      manualCrash(
        "states",
        `StateHandler.navigate[${this.id}]: No such state ${stateKey}`
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
