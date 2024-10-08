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

// Get the entire VFS store in array-form
export function getVfsStore() {
  const vfs = VirtualFilesystemStore.get();
  const result = [];

  for (const dirs of Object.values(vfs)) {
    result.push(...dirs);
  }

  return result;
}

// Gets the virtual user directories via de .data property
export function getVirtualDirectoryListing(path: string): UserDirectory[] {
  const vfs = getVfsStore();
  const matches = vfs.filter((vd) => vd.userPath == path);

  return matches.map((m) => m.data) || [];
}

// Gets all virtual files of the specified directory
export function getVirtualFiles(path: string): PartialArcFile[] {
  const vfs = getVfsStore();
  const matches = vfs.filter((vd) => vd.userPath == path);
  const matchesSafe = cloneWithoutInheritance<VirtualDirectory[]>(matches);

  if (!matchesSafe) return [];

  const result = [];

  for (const match of matchesSafe) {
    result.push(...(match.files || []));
  }

  return result;
}

// Gets all the virtual directories that reside in the specified directory
export function getVirtualDirectories(path: string): PartialUserDir[] {
  const vfs = getVfsStore();
  const matches = vfs.filter((vd) => vd.userPath == path);
  const matchesSafe = cloneWithoutInheritance<VirtualDirectory[]>(matches);

  if (!matchesSafe) return [];

  const result: PartialUserDir[] = [];

  for (const match of matchesSafe) {
    result.push(...(match.dirs || []));
  }

  return result;
}

// Gets the content of a virtual directory
export function getVirtualDirectory(path: string): UserDirectory {
  const vfs = getVfsStore();
  const matches = vfs.filter((vd) => vd.data && vd.data.scopedPath == path);

  const match = matches.map((m) => m.data)[0];

  if (!match) return null;

  const directory = cloneWithoutInheritance<UserDirectory>(match);

  directory.directories.push(...getVirtualDirectoryListing(path));

  directory.directories = sortDirectories(directory.directories);

  return directory;
}

// Loads a Virtual Directory Supplier (VDS) into the store
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

// Refreshes the entire VFS
export async function flushVirtualFilesystem() {
  const suppliers = VirtualFilesystemSuppliers.get();
  const result: Record<string, VirtualDirectory[]> = {};

  for (const { callback, caption } of suppliers) {
    const supplied = await callback();

    if (!supplied || !supplied.length) {
      Log("fs/virtual", `Flush: Failed to get FVS contents of ${caption}!`, LogLevel.error);

      continue;
    }

    for (const supplier of supplied) {
      if (!supplier.data) continue;

      supplier.data.files = sortFiles(supplier.data.files);
    }

    result[caption] = supplied;
  }

  VirtualFilesystemStore.set(result);
}

export async function updateSingleVfsSupplier(caption: string, supplier: VirtualDirectorySupplier) {
  const vfs = VirtualFilesystemStore.get();

  if (!vfs[caption]) return;

  vfs[caption] = await supplier();

  VirtualFilesystemStore.set(vfs);
}
