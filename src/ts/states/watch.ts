import { State } from "$types/state";
import { StateHandler } from ".";
import { Log } from "../console";

const WATCHERS: ((state: State) => any)[] = [];

export class StateWatcher {
  constructor(public readonly handler: StateHandler) {
    Log("states/watch", `Created new StateWatcher for handler ${handler.id}`);

    handler.current.subscribe((v) => this.trigger(v));
  }

  public watch(event: (state: State) => any) {
    const id = this.handler.id;
    Log("state/watch", `StateWatcher.watch ${id}: Adding watcher: ${event.toString()}`);

    WATCHERS.push(event);

    event(this.handler.current.get());
  }

  public async trigger(state: State) {
    const id = this.handler.id;

    for (const watcher of WATCHERS) {
      Log(
        "states/watch",
        `StateWatcher.trigger ${id}: Triggering watcher: state changing to ${state.key}`
      );

      await watcher(state);
    }
  }
}
