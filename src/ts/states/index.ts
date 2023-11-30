import { Log } from "$ts/console";
import { Store } from "$ts/writable";
import { State, States } from "$types/state";

export class StateHandler {
  public readonly current = Store<State>();

  constructor(
    public readonly id: string,
    public readonly store: States,
    public readonly startState: string
  ) {
    Log("ts/states", `Created StateHandler "${id}"`);

    this.navigate(startState);
  }

  public navigate(stateKey: string) {
    if (!this.store.has(stateKey)) return false;

    const state = this.store.get(stateKey);

    if (state.onload) state.onload();

    document.title = `ArcOS | ${state.name}`;

    this.current.set(state);

    return true;
  }
}
