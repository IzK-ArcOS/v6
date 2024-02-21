import { AppRuntime } from "$ts/apps/runtime";

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
];
