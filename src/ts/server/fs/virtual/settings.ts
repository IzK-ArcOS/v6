import { OpenSettingsPage } from "$apps/Settings/ts/main";
import { SettingsStore } from "$apps/Settings/ts/store";
import { BUILD_TIMESTAMP } from "$ts/metadata/timestamp";
import { PartialArcFile, VirtualDirectorySupplierReturn } from "$types/fs";

export async function SettingsVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  const files: PartialArcFile[] = [];
  const pages = SettingsStore();

  for (const [id, page] of [...pages]) {
    files.push({
      filename: `${id}.sap`,
      scopedPath: `ArcOS/System/Settings/${id}.sap`,
      mime: "arcos/sap",
      icon: page.image,
      dateCreated: BUILD_TIMESTAMP,
      dateModified: BUILD_TIMESTAMP,
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
