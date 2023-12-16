import { appLibrary } from "$ts/stores/apps";
import { UserDataStore } from "$ts/stores/user";
import { App } from "$types/app";
import { Nullable } from "$types/common";

export function isPopulatable(app: App) {
  const showHidden = UserDataStore.get().sh.showHiddenApps;

  return !app.metadata.core || showHidden;
}

export function getAppById(id: string): Nullable<App> {
  const library = appLibrary.get();

  if (!library.has(id)) return null;

  return library.get(id);
}