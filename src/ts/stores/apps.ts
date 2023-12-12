import { Store } from "$ts/writable";
import { App, AppLibrary, Processes } from "$types/app";

export const appLibrary: AppLibrary = Store<Record<string, App>>({});
export const processes: Processes = Store<Map<number, App | "disposed">>(new Map([]));
export const focusedPid = Store<number>(0);
export const maxZIndex = Store<number>(1e3);
export const closedPids = Store<number[]>([]);