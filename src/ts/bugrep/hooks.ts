import { handleWindowError } from "./crash/window";

export async function setCrashHooks() {
  window.onunhandledrejection = (e: PromiseRejectionEvent) => {
    handleWindowError(e);
  };
}
