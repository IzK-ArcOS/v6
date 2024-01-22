import { AppRuntime } from "$ts/apps/runtime";

export function RuntimeGlobalDispatches(runtime: AppRuntime): Record<string, () => void> {
  return {
    "minimize-all": () => runtime.minimize()
  }
}

export function RuntimeScopedDispatches(runtime: AppRuntime): Record<string, (data: any) => void> {
  return {
    "minimize": () => runtime.minimize(),
    "maximize": () => runtime.maximize(),
    "restore": () => runtime.restore(),
    "open-file": (file: string) => runtime.handleOpenFile(file)
  }
}