import { LogLevel } from "$types/console";
import { Log } from "./logging";
import { checkLogString } from "./utils";

export function setLoggingHooks() {
  Log("console/hooks", "Setting logging hooks");

  console.warn = (content: string, ...a: any) => {
    if (!checkLogString(content)) return;

    const joined = a.join(" ");

    Log("Console", `${content}${joined}`, LogLevel.warn);
  };

  console.error = (content: string, ...args: any[]) => {
    const joinedArgs = args.join(" ");

    Log("Console", `${content}${joinedArgs}`, LogLevel.warn);
  };
}
