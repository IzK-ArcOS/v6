import { Store } from "$ts/writable";
import { App, AppLibrary, Processes } from "$types/app";

export const appLibrary: AppLibrary = Store<Record<string, App>>({});
export const processes: Processes = Store<Record<number, App | "disposed">>({});