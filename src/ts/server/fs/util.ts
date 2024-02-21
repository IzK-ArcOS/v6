import { Log } from "$ts/console";
import { readDirectory } from "./dir";
import { getFilenameFromPath, readFile } from "./file";

export async function pathExists(path: string): Promise<boolean> {
  Log("server/fs/util", `Checking if ${path} exists`);

  return !!(await readDirectory(path));
}

export async function fileExists(path: string): Promise<boolean> {
  Log("server/fs/util", `Checking if ${path} exists`);
  return !!(await readFile(path));
}

export function pathToFriendlyName(path: string) {
  if (!path) return path;

  if (path === "./" || path === ".") return "Home";

  return getFilenameFromPath(path);
}

export function pathToFriendlyPath(path: string) {
  if (!path) return path;

  if (path === "./" || path === ".") return "Home";

  return path.replace("./", "");
}

export function parseFilename(path: string) {
  const split = path.split("/");

  return split[split.length - 1];
}

export function parseExtension(path: string) {
  const split = path.split(".");

  return `.${split[split.length - 1]}`.toLowerCase();
}
