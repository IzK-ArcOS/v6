import { SEP_ITEM } from "$state/Desktop/ts/store";
import { getAppById, spawnApp, spawnOverlay } from "$ts/apps";
import { AppInfoIcon } from "$ts/images/apps";
import { ShutdownIcon } from "$ts/images/power";
import { AppContextMenu } from "$types/app";
import { ProcessStack } from "../process";

export const BaseAppContext: AppContextMenu = {
  "titlebar": [
    {
      caption: "App Info",
      image: AppInfoIcon,
      action(window) {
        const AppInfo = getAppById("AppInfo");

        spawnOverlay(AppInfo, window.pid, [window.id])
      },
    },
    SEP_ITEM,
    {
      caption: "Minimize",
      icon: "minimize",
      disabled: (window) => !window.controls.minimize || window.state.minimized,
      action: (window) => {
        ProcessStack.dispatch.dispatchToPid(window.pid, "minimize");
      }
    },
    {
      caption: "Maximize",
      icon: "crop_square",
      disabled: (window) => !window.controls.maximize || window.state.maximized,
      action: (window) => {
        ProcessStack.dispatch.dispatchToPid(window.pid, "maximize");
      }
    },
    {
      caption: "close",
      image: ShutdownIcon,
      disabled: (window) => window.metadata.core,
      action: (window) => {
        ProcessStack.kill(window.pid, true)
      }
    }
  ]
}