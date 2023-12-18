import type { App, AppMutator } from "$types/app";
import { AppRuntime } from "$ts/apps";

export class Runtime extends AppRuntime {
  constructor(app: App, mutator: AppMutator) {
    super(app, mutator);
  }
}