import { spawnApp } from "$ts/apps";
import { appLibrary } from "$ts/stores/apps";
import { PartialArcFile, VirtualDirectorySupplierReturn } from "$types/fs";

export async function AppsVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  const files: PartialArcFile[] = [];

  const library = appLibrary.get();

  const now = new Date().getTime();

  for (const [id, app] of [...library]) {
    files.push({
      filename: `${id}.app`,
      scopedPath: `ArcOS/System/Apps/ArcOS.${id}`,
      mime: "arcos/application",
      icon: app.metadata.icon,
      dateCreated: now,
      dateModified: now,
      size: JSON.stringify(app).length,
      virtual: true,
      system: app.metadata.core,
      hidden: app.metadata.hidden,
      onOpen() {
        spawnApp(id);
      },
    });
  }

  return [
    {
      userPath: "ArcOS/System",
      data: {
        name: "Apps",
        scopedPath: "ArcOS/System/Apps",
        files,
        directories: [],
        virtual: true,
        system: true,
      },
    },
  ];
}
