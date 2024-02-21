import { SEP_ITEM } from "$state/Desktop/ts/store";
import { getAppById, spawnOverlay } from "$ts/apps";
import { CompileSnappingContextOption } from "$ts/apps/snapping";
import { GetHelp } from "$ts/help";
import { ShutdownIcon } from "$ts/images/power";
import { AppContextMenu } from "$types/app";
import { ProcessStack } from "../process";

export const BaseAppContext: AppContextMenu = {
  titlebar: [
    {
      caption: "App Info",
      icon: "info_outline",
      action(window) {
        const AppInfo = getAppById("AppInfo");

        spawnOverlay(AppInfo, window.pid, [window.id]);
      },
    },
    {
      caption: "Get Help",
      icon: "question_mark",
      disabled: (window) => !window.helpArticle,
      action(window) {
        GetHelp(window.helpArticle);
      },
    },
    SEP_ITEM,
    {
      caption: "Minimize",
      icon: "minimize",
      disabled: (window) => !window.controls.minimize || window.state.minimized,
      action: (window) => {
        ProcessStack.dispatch.dispatchToPid(window.pid, "minimize");
      },
    },
    {
      caption: "Maximize",
      icon: "crop_square",
      disabled: (window) => !window.controls.maximize,
      action: (window) => {
        ProcessStack.dispatch.dispatchToPid(window.pid, "maximize");
      },
    },
    SEP_ITEM,
    CompileSnappingContextOption(),
    SEP_ITEM,
    {
      caption: "Close",
      image: ShutdownIcon,
      disabled: (window) => window.metadata.core,
      action: (window) => {
        ProcessStack.kill(window.pid, true);
      },
    },
  ],
};
