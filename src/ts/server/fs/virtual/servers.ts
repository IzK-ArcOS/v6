import { ErrorIcon } from "$ts/images/dialog";
import { ConnectIcon } from "$ts/images/general";
import { BUILD_TIMESTAMP } from "$ts/metadata/timestamp";
import { createErrorDialog } from "$ts/process/error";
import { getAllServers } from "$ts/server/multi";
import { ProcessStack } from "$ts/stores/process";
import { ConnectedServer } from "$ts/stores/server";
import { PartialArcFile, VirtualDirectorySupplierReturn } from "$types/fs";

export async function ServersVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  const files: PartialArcFile[] = [];
  const servers = getAllServers();

  for (const server of servers) {
    files.push({
      filename: server,
      scopedPath: `ArcOS/Servers/${server}`,
      mime: "text/plain",
      icon: ConnectIcon,
      dateCreated: BUILD_TIMESTAMP,
      dateModified: BUILD_TIMESTAMP,
      virtual: true,
      system: true,
      size: 0,
      onOpen() {
        const shellPid = ProcessStack.getAppPids("ArcShell")[0];

        if (!shellPid) return;

        createErrorDialog(
          {
            title: `${server}`,
            message: `ArcOS/Servers/${server}<br/><br/>Can't handle multiple server connections at once.`,
            image: ErrorIcon,
            buttons: [{ caption: "Close", action() {}, suggested: true }],
            sound: "arcos.dialog.error",
          },
          shellPid,
          true
        );
      },
    });
  }

  const current = JSON.stringify(ConnectedServer.get(), null, 2);

  files.push({
    filename: `$current.host`,
    scopedPath: `ArcOS/Servers/$current.host`,
    mime: "application/json",
    icon: ConnectIcon,
    dateCreated: BUILD_TIMESTAMP,
    dateModified: BUILD_TIMESTAMP,
    virtual: true,
    system: true,
    size: current.length,
    readProxy() {
      return new Blob([current]);
    },
  });

  return [
    {
      userPath: "ArcOS",
      data: {
        name: "Servers",
        scopedPath: "ArcOS/Servers",
        files,
        directories: [],
        virtual: true,
        system: true,
      },
    },
  ];
}
