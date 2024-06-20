import { AppRuntime } from "$ts/apps/runtime";
import { GlobalDispatchResult } from "$types/dispatch";

export function RuntimeGlobalDispatches(runtime: AppRuntime): Record<string, () => void> {
  return {
    "minimize-all": () => runtime.minimize(),
  };
}

export function RuntimeScopedDispatches(runtime: AppRuntime): Record<string, (data: any) => void> {
  return {
    minimize: () => runtime.minimize(),
    maximize: () => runtime.maximize(),
    restore: () => runtime.restore(),
    "open-file": (file: string) => runtime.handleOpenFile(file),
    "snapping-disable": () => {
      runtime.appMutator.update((v) => {
        v.state.snapping = false;

        return v;
      });
    },
    "snapping-set": (state) => {
      runtime.appMutator.update((v) => {
        v.state.snapState = state;
        v.state.snapping = true;

        return v;
      });
    },
  };
}

export const KnownGlobalDispatchers = [
  "fs-flush",
  "services-flush",
  "desktop-show",
  "desktop-hide",
  "elevation-accept",
  "elevation-reject",
  "minimize-all",
  "message-flush",
  "rate-limit",
  "change-tray-icon",
  "notify-tray-icons",
];

export const SystemOnlyDispatches = ["elevation-accept", "elevation-reject"];

export const DispatchCaptions = {
  "fs-flush": "Refresh all filesystem-dependent components",
  "services-flush": "Refresh all service-dependent components",
  "desktop-show": "Fade-in the desktop - used by auth management",
  "desktop-hide": "Fade-out the desktop - used by auth management",
  "elevation-accept": "Accept elevation for the specified elevation PID",
  "elevation-reject": "Reject elevation for the specified elevation PID",
  "minimize-all": "Minimize all opened windows",
  "message-flush": "Refresh all messaging-dependent components (MNS handled)",
  "rate-limit": "Triggers the RLNS to inform the user of a rate limit",
  "change-tray-image": "Change the image of a tray icon",
  "notify-tray-icons": "Display a list of current tray icons",
};

export const GlobalDispatchResultCaptions: Record<GlobalDispatchResult, string> = {
  success: "The event was dispatched successfully.",
  err_unknownCaller: "The specified event has no associated callers.",
  err_systemOnly: "Not allowed to dispatch a system event as a user.",
};
