import { UserDataStore } from "$ts/stores/user";
import { VirtualDirectorySupplierReturn } from "$types/fs";
import { getParentDirectory } from "../dir";
import { getPartialFile } from "../file";

export async function FilesystemShortcuts(): Promise<VirtualDirectorySupplierReturn> {
  const result: VirtualDirectorySupplierReturn = [];
  const userdata = UserDataStore.get();

  if (!userdata.shortcuts) return [];

  for (const [source, destination] of userdata.shortcuts) {
    const partial = await getPartialFile(source);
    const parent = getParentDirectory(destination);

    console.log(partial, parent, source, destination);

    if (!partial) continue;

    result.push({
      userPath: parent,
      files: [{ ...partial, virtual: true }],
    });
  }

  return result;
}
