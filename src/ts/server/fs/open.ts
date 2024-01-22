import { getAppById, spawnApp } from "$ts/apps";
import { ProcessStack } from "$ts/stores/process";
import { PartialArcFile } from "$types/fs";

export async function openFileWithApp(id: string, file: PartialArcFile) {
  const app = getAppById(id);

  if (!app) return false;

  const pid = await spawnApp(id);

  if (typeof pid == "string") return false;

  ProcessStack.dispatch.dispatchToPid(pid, "open-file", file.scopedPath);

  return true;
}