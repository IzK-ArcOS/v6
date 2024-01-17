import { appLibrary } from "$ts/stores/apps";
import { BaseAppContext } from "$ts/stores/apps/context";
import { ProcessStack } from "$ts/stores/process";
import { UserDataStore } from "$ts/stores/user";
import { App } from "$types/app";
import { Nullable } from "$types/common";

export function isPopulatable(app: App, includeOverlays?: boolean) {
  const showHidden = UserDataStore.get().sh.showHiddenApps || includeOverlays;

  return (!app.metadata.core && !app.isOverlay && !app.metadata.hidden) || showHidden;
}

export function isOpened(id: string): boolean {
  return ProcessStack.getAppPids(id).length > 0
}

export function getAppById(id: string, override?: App): Nullable<App> {
  const library = appLibrary.get();

  if (!library.has(id) && !override) return null;

  const app = override || library.get(id);
  const runtime = app.runtime;
  const content = app.content;
  const loadCondition = app.loadCondition;
  const spawnCondition = app.spawnCondition;
  const contextMenu = { ...app.contextMenu, ...BaseAppContext };
  const accelerators = app.accelerators;
  const isolated = JSON.parse(JSON.stringify(app));

  return { ...isolated, runtime, content, loadCondition, spawnCondition, contextMenu, accelerators };
}
