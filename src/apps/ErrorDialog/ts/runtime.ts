import { AppRuntime } from "$ts/apps";
import { Process } from "$ts/process";
import type { App, AppMutator } from "$types/app";

export class Runtime extends AppRuntime {
  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    mutator.update((v) => {
      v.metadata.name = process.args[0].title
      return v;
    })
  }
}