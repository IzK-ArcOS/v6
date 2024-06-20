import { OpenSettingsPage } from "$apps/Settings/ts/main";
import { OverlayRuntime } from "$apps/Settings/ts/overlays/runtime";
import { SettingsStore } from "$apps/Settings/ts/store";
import { Spawn } from "$ts/apps";
import { ProcessStack } from "$ts/stores/process";
import { PartialArcFile, VirtualDirectorySupplierReturn } from "$types/fs";

export async function SettingsVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  const files: PartialArcFile[] = [];
  const pages = SettingsStore();
  const now = new Date().getTime();

  for (const [id, page] of [...pages]) {
    files.push({
      filename: `${id}.sap`,
      scopedPath: `ArcOS/System/Settings/ArcOS.${id}`,
      mime: "arcos/sap",
      icon: page.image,
      dateCreated: now,
      dateModified: now,
      size: JSON.stringify(page).length,
      virtual: true,
      system: true,
      onOpen() {
        OpenSettingsPage(id, true);
      },
    });
  }

  return [
    {
      userPath: "ArcOS/System",
      data: {
        name: "Settings",
        scopedPath: "ArcOS/System/Settings",
        files,
        directories: [],
        virtual: true,
        system: true,
      },
    },
  ];
}
