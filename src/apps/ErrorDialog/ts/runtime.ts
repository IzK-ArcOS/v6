import { AppRuntime } from "$ts/apps/runtime";
import { WarningIcon } from "$ts/images/general";
import { sendNotification } from "$ts/notif";
import { Process } from "$ts/process";
import type { App, AppMutator } from "$types/app";
import { ErrorDialog } from "$types/error";

export class Runtime extends AppRuntime {
  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    function stop() {
      process.handler.kill(process.pid);

      sendNotification({
        title: "Can't open Error",
        message: `No valid data was specified to use in the dialog. Aborting.`,
        image: WarningIcon,
        timeout: 3000,
      })
    }

    const data: ErrorDialog = process.args[0];

    if (!data) {
      stop(); return
    }

    mutator.update((v) => { // Adapt the window properties to the error dialog's data
      v.metadata.name = data.title;
      v.metadata.icon = data.image || WarningIcon;
      v.maxSize.w = data.component && !data.shrunk ? 500 : 400;
      return v;
    })
  }
}