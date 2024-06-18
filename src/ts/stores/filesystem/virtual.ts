import { HelpVirtualFolder } from "$ts/server/fs/virtual/help";
import { SystemVirtualFolder } from "$ts/server/fs/virtual/system";
import { Store } from "$ts/writable";
import { VirtualDirectory, VirtualDirectorySupplier } from "$types/fs";

export const VirtualFilesystemStore = Store<VirtualDirectory[]>([]);
export const VirtualFilesystemSuppliers = Store<VirtualDirectorySupplier[]>([
  SystemVirtualFolder,
  HelpVirtualFolder,
]);
