import { Store } from "$ts/writable";
import { App, AppLibrary, Processes } from "$types/app";

export * from "./builtins";
export * from "./groups";

export const appLibrary: AppLibrary = Store<Map<string, App>>(new Map([]));
export const processes: Processes = Store<Map<number, App | "disposed">>(new Map([]));
export const focusedPid = Store<number>(0);
export const maxZIndex = Store<number>(1e3);
export const ClosedPids = Store<number[]>([]);