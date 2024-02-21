import { PartialArcFile, PartialUserDir } from "$types/fs";

export function sortFiles(dir: PartialArcFile[]) {
  if (!dir) return [];

  return dir.sort((a, b) => (a.filename.toLowerCase() > b.filename.toLowerCase() ? 1 : -1));
}

export function sortDirectories(dir: PartialUserDir[]) {
  if (!dir) return [];

  return dir.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
}
