import { SEP_ITEM } from "$state/Desktop/ts/store";
import { ErrorIcon } from "$ts/images/dialog";
import { SpinnerIcon, WindowSnapIcon } from "$ts/images/general";
import { BadStatusIcon } from "$ts/images/status";
import { WindowSnappingStates } from "$ts/stores/apps/snapping";
import { WindowSnappingIcons } from "$ts/stores/apps/snapicons";
import { ProcessStack } from "$ts/stores/process";
import { ContextMenuItem } from "$types/app";

export function CompileSnappingContextOption(): ContextMenuItem {
  const root: ContextMenuItem = {
    caption: "Window Snapping",
    image: WindowSnapIcon,
    disabled: (window) => !!window.isOverlay || !window.controls.maximize,

    subItems: [
      {
        caption: "None",
        image: BadStatusIcon,
        action(window) {
          ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-disable");
        }
      },
      SEP_ITEM
    ]
  }
  
  for (const state in WindowSnappingStates) {
    const caption = WindowSnappingStates[state];

    if (state.startsWith("$")) {
      root.subItems.push(SEP_ITEM)

      continue;
    }

    root.subItems.push({
      caption,
      image: WindowSnappingIcons[state],
      action(window) {
        ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-set", state)
      }
    })
  }
  

  return root;
}