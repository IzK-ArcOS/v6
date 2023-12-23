import { AppRuntime } from "$ts/apps/runtime";
import { WarningIcon } from "$ts/images/general";
import { Process } from "$ts/process";
import type { App, AppMutator } from "$types/app";
import { ErrorDialog } from "$types/error";

export class Runtime extends AppRuntime {
  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    const data: ErrorDialog = process.args[0];

    if (!data) return;

    mutator.update((v) => { // Adapt the window properties to the error dialog's data
      v.metadata.name = data.title;
      v.metadata.icon = data.image || WarningIcon
      return v;
    })
  }
}