import { getAppById, spawnOverlay } from "$ts/apps";
import { ComponentIcon } from "$ts/images/general";
import { ProcessStack } from "$ts/stores/process";
import { serviceStore } from "$ts/stores/service";
import { PartialArcFile, VirtualDirectorySupplierReturn } from "$types/fs";

export async function ServicesVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  const services = serviceStore;
  const files: PartialArcFile[] = [];
  const now = new Date().getTime();

  for (const [id, service] of [...services]) {
    const stringified = service.process.toString();
    files.push({
      filename: `${id}.svc`,
      scopedPath: `ArcOS/System/Services/${id}.svc`,
      mime: "arcterm/command",
      dateCreated: now,
      dateModified: now,
      icon: ComponentIcon,
      size: stringified.length,
      onOpen() {
        const shellPid = ProcessStack.getAppPids("ArcShell")[0];

        if (!shellPid) return;

        spawnOverlay(getAppById("ServiceInfo"), shellPid, [id]);
      },
      readProxy() {
        return new Blob([stringified]);
      },
    });
  }

  return [
    {
      userPath: "ArcOS/System",
      data: {
        name: "Services",
        scopedPath: "ArcOS/System/Services",
        files,
        directories: [],
        virtual: true,
        system: true,
      },
    },
  ];
}
