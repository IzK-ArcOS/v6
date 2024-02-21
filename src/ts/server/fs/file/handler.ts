import { OpenWith as OpenWithApp } from "$apps/OpenWith/ts/app";
import { spawnOverlay } from "$ts/apps";
import { UnknownFileIcon } from "$ts/images/mime";
import { createErrorDialog } from "$ts/process/error";
import { FileHandlers } from "$ts/stores/filesystem/handlers";
import { AppSpawnResult } from "$types/app";
import { Nullable } from "$types/common";
import { FileHandler, PartialArcFile } from "$types/fs";
import { parseExtension } from "../util";

export async function OpenFile(file: PartialArcFile, parentPid?: number) {
  const handlers = getCompatibleHandlers(file.scopedPath, false);

  if (!handlers.length) {
    if (!parentPid) return;

    noCompatibleHandlers(file, parentPid);

    return;
  }

  return await handlers[0].handler(file);
}

export function getCompatibleHandlers(path: string, wildcards = true) {
  const extension = parseExtension(path);
  const handlers = FileHandlers.filter(
    (h) => h.extensions.includes(extension) || (wildcards && h.extensions.includes("*.*"))
  );

  return handlers;
}

export function getHandlerByName(name: string): Nullable<FileHandler> {
  const handlers = FileHandlers.filter((h) => h.name == name);

  return handlers[0];
}

export async function OpenWith(
  file: PartialArcFile,
  parentPid: number,
  bypassAuto = false
): Promise<AppSpawnResult> {
  const compatibles = getCompatibleHandlers(file.scopedPath, false);

  if (compatibles.length == 1 && !bypassAuto) {
    OpenFile(file);

    return "success";
  }

  const proc = await spawnOverlay(OpenWithApp, parentPid, [file]);

  if (typeof proc === "string") return proc;

  return "success";
}

export function noCompatibleHandlers(file: PartialArcFile, parentPid?: number) {
  createErrorDialog(
    {
      title: `Unknown file type`,
      message: `ArcOS doesn't have any compatible file handlers to open ${file.filename}. Do you want to select from a list of all handlers instead?`,
      buttons: [
        {
          caption: "Cancel",
          action() {},
        },
        {
          caption: "Open With...",
          action() {
            OpenWith(file, parentPid);
          },
          suggested: true,
        },
      ],
      image: UnknownFileIcon,
      sound: "arcos.dialog.warning",
    },
    parentPid,
    true
  );
}
