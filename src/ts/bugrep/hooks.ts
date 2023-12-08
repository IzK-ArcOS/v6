import { Log } from "$ts/console";
import { handleWindowError } from "./crash/window";

export async function setCrashHooks() {
  Log("bugrep/hooks", "Setting crash hooks");
  window.onunhandledrejection = (e: PromiseRejectionEvent) => {
    handleWindowError(e);
  };
}
