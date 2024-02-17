import { Store } from "$ts/writable";
import { App, AppLibrary } from "$types/app";

export * from "./builtins";
export * from "./groups";

export const appLibrary: AppLibrary = Store<Map<string, App>>(new Map([]));
export const maxZIndex = Store<number>(1e3);
