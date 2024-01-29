import { SEP_ITEM } from "$state/Desktop/ts/store";
import { WindowSnappingIcons } from "$ts/stores/apps/snapicons";
import { WindowSnappingStates } from "$ts/stores/apps/snapping";
import { ProcessStack } from "$ts/stores/process";
import { ContextMenuItem } from "$types/app";

export function CompileSnappingContextOption(): ContextMenuItem {
  const root: ContextMenuItem = {
    caption: "Window Snapping",
    icon: "center_focus_weak",
    disabled: (window) => !!window.isOverlay || !window.controls.maximize,
    subItems: [
      {
        caption: "None",
        icon: "close",
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
      icon: WindowSnappingIcons[state],
      action(window) {
        ProcessStack.dispatch.dispatchToPid(window.pid, "snapping-set", state)
      }
    })
  }


  return root;
}