import { OpenSettingsPage } from "$apps/Settings/ts/main";
import { AccountIcon } from "$ts/images/general";
import { BUILD_TIMESTAMP } from "$ts/metadata/timestamp";
import { VirtualSystemFolderExpr } from "$ts/stores/filesystem/virtual";
import { UserDataStore } from "$ts/stores/user";
import { PartialArcFile, VirtualDirectory, VirtualDirectorySupplierReturn } from "$types/fs";

export async function SystemVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  try {
    const json = (await (await fetch("./files.json")).json()) as PartialArcFile[];

    const grouped = populateSystemSubfolders(json);
    const virtuals: VirtualDirectory[] = [];

    for (const [folder, files] of Object.entries(grouped)) {
      const name = folder;

      virtuals.push({
        userPath: `ArcOS`,
        data: {
          name,
          scopedPath: `ArcOS/${name}`,
          files: files.map((f) => ({ ...f, virtual: true })),
          directories: [],
          virtual: true,
          system: true,
        },
      });
    }

    return [
      ...virtuals,
      {
        userPath: "./",
        data: {
          name: "ArcOS",
          scopedPath: "ArcOS",
          files: [
            {
              mime: "text/plain",
              filename: "mode",
              scopedPath: "@client/mode",
              size: 178,
              dateCreated: BUILD_TIMESTAMP,
              dateModified: BUILD_TIMESTAMP,
              virtual: true,
              system: true,
            },
            {
              mime: "text/plain",
              filename: "build",
              scopedPath: "@client/build",
              size: 178,
              dateCreated: BUILD_TIMESTAMP,
              dateModified: BUILD_TIMESTAMP,
              virtual: true,
              system: true,
            },
            {
              mime: "text/plain",
              filename: "timestamp",
              scopedPath: "@client/timestamp",
              size: 178,
              dateCreated: BUILD_TIMESTAMP,
              dateModified: BUILD_TIMESTAMP,
              virtual: true,
              system: true,
            },
            {
              mime: "text/plain",
              filename: "files.json",
              scopedPath: "@client/files.json",
              size: JSON.stringify(json).length,
              dateCreated: BUILD_TIMESTAMP,
              dateModified: BUILD_TIMESTAMP,
              virtual: true,
              system: true,
            },
            {
              mime: "application/markdown",
              filename: "README.md",
              scopedPath: "@client/help/Virtual.md",
              size: 0,
              dateCreated: BUILD_TIMESTAMP,
              dateModified: BUILD_TIMESTAMP,
              virtual: true,
              system: true,
            },
            {
              filename: "ArcUser.ud",
              mime: "application/json",
              dateModified: BUILD_TIMESTAMP,
              dateCreated: BUILD_TIMESTAMP,
              icon: AccountIcon,
              scopedPath: `ArcOS/ArcUser.ud`,
              system: true,
              virtual: true,
              size: 178,
              readProxy() {
                return new Blob([JSON.stringify(UserDataStore.get(), null, 2)]);
              },
              onOpen() {
                OpenSettingsPage("account", true);
              },
            },
          ],
          directories: [],
          hidden: true,
          virtual: true,
          system: true,
        },
      },
    ];
  } catch {
    return null;
  }
}

function groupByExtension(files: PartialArcFile[]): Record<string, PartialArcFile[]> {
  let result: Record<string, PartialArcFile[]> = {};

  for (const file of files) {
    const split = file.filename.split(".");
    const extension = split[split.length - 1];

    if (!result[extension]) result[extension] = [file];
    else result[extension].push(file);
  }

  return result;
}

function populateSystemSubfolders(files: PartialArcFile[]): Record<string, PartialArcFile[]> {
  const result: Record<string, PartialArcFile[]> = {};
  const fileSafe = JSON.parse(JSON.stringify(files)) as PartialArcFile[];
  const blacklist = [];

  for (const [folder, expr, system] of [...VirtualSystemFolderExpr]) {
    if (!result[folder]) result[folder] = [];

    for (let i = 0; i < fileSafe.length; i++) {
      if (blacklist.includes(fileSafe[i].scopedPath)) continue;

      const filename = fileSafe[i].filename.replace(expr, "");

      if (!filename.length) {
        result[folder].push({ ...fileSafe[i], system });
        blacklist.push(fileSafe[i].scopedPath);
      }
    }
  }

  return result;
}
