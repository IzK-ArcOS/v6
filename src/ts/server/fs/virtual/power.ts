import { logout, restart, shutdown } from "$state/Desktop/ts/power";
import { LogoutIcon, RestartIcon, ShutdownIcon } from "$ts/images/power";
import { BUILD_TIMESTAMP } from "$ts/metadata/timestamp";
import { VirtualDirectorySupplierReturn } from "$types/fs";

export async function PowerVirtualFolder(): Promise<VirtualDirectorySupplierReturn> {
  return [
    {
      userPath: "ArcOS/System",
      data: {
        name: "Power",
        scopedPath: "ArcOS/System/Power",
        directories: [],
        files: [
          {
            filename: "Shutdown.pwr",
            icon: ShutdownIcon,
            mime: "arcos/power",
            scopedPath: "ArcOS/System/Power/Shutdown.pwr",
            dateCreated: BUILD_TIMESTAMP,
            dateModified: BUILD_TIMESTAMP,
            size: shutdown.toString().length,
            onOpen() {
              shutdown();
            },
            readProxy() {
              return new Blob([shutdown.toString()]);
            },
            virtual: true,
          },
          {
            filename: "Restart.pwr",
            icon: RestartIcon,
            mime: "arcos/power",
            scopedPath: "ArcOS/System/Power/Restart.pwr",
            dateCreated: BUILD_TIMESTAMP,
            dateModified: BUILD_TIMESTAMP,
            size: restart.toString().length,
            onOpen() {
              restart();
            },
            readProxy() {
              return new Blob([restart.toString()]);
            },
            virtual: true,
          },
          {
            filename: "Logoff.pwr",
            icon: LogoutIcon,
            mime: "arcos/power",
            scopedPath: "ArcOS/System/Power/Logoff.pwr",
            dateCreated: BUILD_TIMESTAMP,
            dateModified: BUILD_TIMESTAMP,
            size: logout.toString().length,
            onOpen() {
              logout();
            },
            readProxy() {
              return new Blob([logout.toString()]);
            },
            virtual: true,
          },
        ],
        virtual: true,
        system: true,
      },
    },
  ];
}
