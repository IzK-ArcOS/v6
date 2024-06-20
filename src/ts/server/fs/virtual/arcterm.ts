import { arcCommands, desktopSpecific, gooseBumpsCommands } from "$state/ArcTerm/ts/terminal/store";
import { spawnApp } from "$ts/apps";
import { ArcTermMimeIcon } from "$ts/images/mime";
import { stringifyObject } from "$ts/util/stringify";
import { PartialArcFile, VirtualDirectorySupplierReturn } from "$types/fs";

export async function ArcTermVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  const commands = [...arcCommands, ...desktopSpecific, ...gooseBumpsCommands];
  const files: PartialArcFile[] = [];
  const now = new Date().getTime();

  for (const command of commands) {
    const stringified = stringifyObject(command);

    files.push({
      filename: `${command.keyword}.cmd`,
      scopedPath: `ArcOS/System/Apps/ArcTerm/${command.keyword}.cmd`,
      mime: "arcterm/command",
      dateCreated: now,
      dateModified: now,
      icon: ArcTermMimeIcon,
      size: stringified.length,
      onOpen() {
        spawnApp("ArcTerm", 0, [[command.keyword, "exit"]]);
      },
      readProxy() {
        return new Blob([stringified]);
      },
    });
  }

  return [
    {
      userPath: "ArcOS/System/Apps",
      data: {
        name: "ArcTerm",
        scopedPath: "ArcOS/System/Apps/ArcTerm",
        files,
        directories: [],
        virtual: true,
        system: true,
      },
    },
  ];
}
