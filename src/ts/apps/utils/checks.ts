import { appLibrary } from "$ts/stores/apps";
import { ProcessStack } from "$ts/stores/process";
import { UserDataStore } from "$ts/stores/user";
import { App } from "$types/app";

export function isPopulatable(app: App, includeOverlays?: boolean) {
  if (!app) return false;

  const userdata = UserDataStore.get();

  if (!userdata) return false;

  const showHidden = userdata.sh.showHiddenApps || includeOverlays;

  return (!app.metadata.core && !app.isOverlay && !app.metadata.hidden) || showHidden;
}

export function isOpened(id: string): boolean {
  return ProcessStack.getAppPids(id).length > 0;
}

export function isLoaded(id: string): boolean {
  return !![...appLibrary.get()].filter(([i]) => i == id).length;
}
