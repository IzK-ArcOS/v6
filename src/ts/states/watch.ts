import { State } from "$types/state";
import { StateHandler } from ".";
import { Log } from "../console";

const WATCHERS: ((state: State) => any)[] = [];

export class StateWatcher {
  constructor(public readonly handler: StateHandler) {
    Log(
      "ts/states/watch",
      `Created new StateWatcher for handler ${handler.id}`
    );

    handler.current.subscribe((v) => this.trigger(v));
  }

  public watch(event: (state: State) => any) {
    Log(
      "ts/state/watch: StateWatcher.watch",
      `${this.handler.id}: Adding watcher: ${event.toString()}`
    );

    WATCHERS.push(event);

    event(this.handler.current.get());
  }

  public async trigger(state: State) {
    for (let i = 0; i < WATCHERS.length; i++) {
      Log(
        "ts/states/watch: StateWatcher.trigger",
        `${this.handler.id}: Triggering watcher at index ${i}: state changing to ${state.key}`
      );

      await WATCHERS[i](state);
    }
  }
}
