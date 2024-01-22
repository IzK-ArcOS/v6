import { SEP_ITEM } from "$state/Desktop/ts/store";
import { getAppById, spawnOverlay } from "$ts/apps";
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
    SEP_ITEM,
    {
      caption: "Window Snapping",
      disabled: (window) => !!window.isOverlay,
      subItems: [
        {
          caption: "None",
          action(window) {
            ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-disable");
          }
        },
        SEP_ITEM,
        {
          caption: "Left",
          action(window) {
            ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-set", "left");
          }
        },
        {
          caption: "Right",
          action(window) {
            ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-set", "right");
          }
        },
        SEP_ITEM,
        {
          caption: "Top",
          action(window) {
            ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-set", "top");
          }
        }, {
          caption: "Bottom",
          action(window) {
            ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-set", "bottom");
          },
        },
        SEP_ITEM,
        {
          caption: "Top Left",
          action(window) {
            ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-set", "top-left");
          }
        }, {
          caption: "Top Right",
          action(window) {
            ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-set", "top-right");
          }
        },
        SEP_ITEM,
        {
          caption: "Bottom Left",
          action(window) {
            ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-set", "bottom-left");
          }
        },
        {
          caption: "Bottom Right",
          action(window) {
            ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-set", "bottom-right");
          }
        }
      ]
    },
    SEP_ITEM,
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