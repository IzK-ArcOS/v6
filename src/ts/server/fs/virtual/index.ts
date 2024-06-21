import { Log } from "$ts/console";
import { VirtualFilesystemStore, VirtualFilesystemSuppliers } from "$ts/stores/filesystem/virtual";
import { cloneWithoutInheritance } from "$ts/util/clone";
import { LogLevel } from "$types/console";
import {
  PartialArcFile,
  PartialUserDir,
  UserDirectory,
  VirtualDirectory,
  VirtualDirectorySupplier,
} from "$types/fs";
import { sortDirectories, sortFiles } from "../sort";

export function getVirtualDirectoryListing(path: string): UserDirectory[] {
  Log("fs/virtual", `Getting VFS directory listing for ${path}`);

  const vfs = VirtualFilesystemStore.get();
  const matches = vfs.filter((vd) => vd.userPath == path);

  return matches.map((m) => m.data) || [];
}

export function getVirtualFiles(path: string): PartialArcFile[] {
  Log("fs/virtual", `Getting VFS files for ${path}`);

  const vfs = VirtualFilesystemStore.get();
  const matches = vfs.filter((vd) => vd.userPath == path);
  const matchesSafe = cloneWithoutInheritance<VirtualDirectory[]>(matches);

  if (!matchesSafe) return [];

  const result = [];

  for (const match of matchesSafe) {
    result.push(...(match.files || []));
  }

  return result;
}

export function getVirtualDirectories(path: string): PartialUserDir[] {
  Log("fs/virtual", `Getting VFS directories for ${path}`);

  const vfs = VirtualFilesystemStore.get();
  const matches = vfs.filter((vd) => vd.userPath == path);
  const matchesSafe = cloneWithoutInheritance<VirtualDirectory[]>(matches);

  if (!matchesSafe) return [];

  const result: PartialUserDir[] = [];

  for (const match of matchesSafe) {
    result.push(...(match.dirs || []));
  }

  return result;
}

export function getVirtualDirectory(path: string): UserDirectory {
  Log("fs/virtual", `Getting VFS content for ${path}`);

  const vfs = VirtualFilesystemStore.get();
  const matches = vfs.filter((vd) => vd.data && vd.data.scopedPath == path);

  const match = matches.map((m) => m.data)[0];

  if (!match) return null;

  const directory = cloneWithoutInheritance<UserDirectory>(match);

  directory.directories.push(...getVirtualDirectoryListing(path));

  directory.directories = sortDirectories(directory.directories);

  return directory;
}

export function loadVirtualDirectorySupplier(
  callback: VirtualDirectorySupplier,
  caption: string,
  flush = true
) {
  const suppliers = VirtualFilesystemSuppliers.get();

  suppliers.push({ callback, caption });

  VirtualFilesystemSuppliers.set(suppliers);

  if (flush) flushVirtualFilesystem();
}

export async function flushVirtualFilesystem() {
  Log("fs/virtual", `Flushing virtual filesystem`);

  const suppliers = VirtualFilesystemSuppliers.get();
  const result = [];

  for (const { callback, caption } of suppliers) {
    const supplied = await callback();

    if (!supplied) {
      Log("fs/virtual", `Flush: Failed to get FVS contents of ${caption}!`, LogLevel.error);

      continue;
    }

    for (const supplier of supplied) {
      if (!supplier.data) continue;

      supplier.data.files = sortFiles(supplier.data.files);
    }

    result.push(...supplied);
  }

  VirtualFilesystemStore.set(result);
}
