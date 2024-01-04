import { appLibrary } from "$ts/stores/apps";
import { UserDataStore } from "$ts/stores/user";
import { App } from "$types/app";
import { Nullable } from "$types/common";

export function isPopulatable(app: App, includeOverlays?: boolean) {
  const showHidden = UserDataStore.get().sh.showHiddenApps || includeOverlays;

  return (!app.metadata.core && !app.isOverlay && !app.metadata.hidden) || showHidden;
}

export function getAppById(id: string): Nullable<App> {
  const library = appLibrary.get();

  if (!library.has(id)) return null;

  const app = library.get(id);
  const runtime = app.runtime;
  const content = app.content;
  const loadCondition = app.loadCondition
  const contextMenu = app.contextMenu;
  const isolated = JSON.parse(JSON.stringify(app));

  return { ...isolated, runtime, content, loadCondition, contextMenu };
}
