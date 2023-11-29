import { Log } from "$ts/console";
import { ReadableStore } from "$types/writable";

export class StateHandler {
  public readonly current: ReadableStore<State>;

  constructor(public readonly id: string, public readonly store: States) {
    Log("ts/states", `Created StateHandler "${id}"`);
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
