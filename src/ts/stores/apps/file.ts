import { LoadSaveDialog } from "$apps/LoadSaveDialog/ts/app";
import { LoadSaveDialogData } from "$apps/LoadSaveDialog/ts/types";
import { spawnOverlay } from "$ts/apps";
import { ProcessStack } from "../process";

export async function GetSaveFilePath(pid: number, data: LoadSaveDialogData): Promise<string> {
  const app = LoadSaveDialog;

  await spawnOverlay(app, pid, [{ ...data, isSave: true }]);

  return new Promise<string>((r) => {
    ProcessStack.dispatch.subscribe(pid, "save-file", (v: string) => r(v));
    ProcessStack.dispatch.subscribe(pid, "ls-dialog-cancel", () => r(""));
  });
}
