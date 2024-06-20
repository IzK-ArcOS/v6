import { ErrorIcon } from "$ts/images/dialog";
import { ComponentIcon } from "$ts/images/general";
import { createErrorDialog } from "$ts/process/error";
import { ProcessStack } from "$ts/stores/process";
import { primaryStates } from "$ts/stores/state";
import { stringifyObject } from "$ts/util/stringify";
import { PartialArcFile, VirtualDirectorySupplierReturn } from "$types/fs";

export async function StatesVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  const files: PartialArcFile[] = [];
  const states = primaryStates;
  const now = new Date().getTime();

  for (const [id, state] of [...states]) {
    const stringified = stringifyObject(state);
    files.push({
      filename: `${id}.arc`,
      mime: "arcos/state",
      scopedPath: `ArcOS/System/States/${state.key}.arc`,
      dateCreated: now,
      dateModified: now,
      icon: state.image || ComponentIcon,
      virtual: true,
      system: true,
      size: stringified.length,
      onOpen() {
        const shellPid = ProcessStack.getAppPids("ArcShell")[0];

        if (!shellPid) return;

        createErrorDialog(
          {
            title: `${state.name}`,
            message: `ArcOS/System/States/${state.key}.arc<br/><br/>Incorrect function.`,
            image: ErrorIcon,
            buttons: [{ caption: "Close", action() {}, suggested: true }],
            sound: "arcos.dialog.error",
          },
          shellPid,
          true
        );
      },
      readProxy() {
        return new Blob([stringified]);
      },
    });
  }

  return [
    {
      userPath: "ArcOS/System",
      data: {
        name: "States",
        scopedPath: "ArcOS/System/States",
        directories: [],
        files,
        virtual: true,
        system: true,
      },
    },
  ];
}
