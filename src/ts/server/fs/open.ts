import { getAppById, spawnApp } from "$ts/apps";
import { PartialArcFile } from "$types/fs";

export async function openFileWithApp(id: string, file: PartialArcFile) {
  const app = getAppById(id);

  if (!app) return false;

  return await spawnApp(id, 0, [file.scopedPath]);
}
