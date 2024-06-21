import { UserDataStore } from "$ts/stores/user";
import { VirtualDirectorySupplierReturn } from "$types/fs";
import { getParentDirectory } from "../dir";
import { getFilenameFromPath, getPartialDirectory, getPartialFile } from "../file";

export async function FilesystemShortcuts(): Promise<VirtualDirectorySupplierReturn> {
  const result: VirtualDirectorySupplierReturn = [];
  const userdata = UserDataStore.get();

  if (!userdata.shortcuts) return [];

  for (const [source, destination] of userdata.shortcuts) {
    const partialFile = await getPartialFile(source);
    const partialDir = await getPartialDirectory(source);
    const parent = getParentDirectory(destination);
    const destinationitemName = getFilenameFromPath(destination);

    console.log(partialFile, partialDir);

    if (!partialFile && !partialDir) continue;

    result.push({
      userPath: parent,
      files: partialFile ? [{ ...partialFile, virtual: true, filename: destinationitemName }] : [],
      dirs: partialDir ? [{ ...partialDir, virtual: true, name: destinationitemName }] : [],
    });
  }

  return result;
}
