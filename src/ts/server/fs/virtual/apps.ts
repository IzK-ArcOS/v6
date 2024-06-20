import { spawnApp } from "$ts/apps";
import { BUILD_TIMESTAMP } from "$ts/metadata/timestamp";
import { appLibrary } from "$ts/stores/apps";
import { stringifyObject } from "$ts/util/stringify";
import { PartialArcFile, VirtualDirectorySupplierReturn } from "$types/fs";

export async function AppsVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  const files: PartialArcFile[] = [];

  const library = appLibrary.get();

  for (const [id, app] of [...library]) {
    files.push({
      filename: `${id}.app`,
      scopedPath: `ArcOS/System/Apps/${id}.app`,
      mime: "arcos/application",
      icon: app.metadata.icon,
      dateCreated: BUILD_TIMESTAMP,
      dateModified: BUILD_TIMESTAMP,
      size: JSON.stringify(app).length,
      virtual: true,
      system: app.metadata.core,
      hidden: app.metadata.hidden,
      onOpen() {
        spawnApp(id);
      },
      readProxy() {
        return new Blob([stringifyObject(app)]);
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
