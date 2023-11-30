import { LogLevel } from "$types/console";
import { Log } from "./logging";
import { checkLogString } from "./utils";

export function setLoggingHooks() {
  console.warn = (c: string, ...a: any) =>
    checkLogString(c) && Log("Console", c + a.join(" "), LogLevel.warn);

  console.error = (content: string, ...a: any[]) =>
    Log("Console", content + a.join(" "), LogLevel.error);
}
