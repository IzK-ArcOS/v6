import { Store } from "$ts/writable";
import { App, AppLibrary } from "$types/app";
import { Processes } from "$types/process";

export * from "./builtins";
export * from "./groups";

export const appLibrary: AppLibrary = Store<Map<string, App>>(new Map([]));
export const focusedPid = Store<number>(0);
export const maxZIndex = Store<number>(1e3);