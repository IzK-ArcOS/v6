import { Log } from "$ts/console";
import { compileStackString } from "$ts/console/logging/stack";
import { PrimaryState } from "$ts/states";
import { CRASHING, CrashReport } from "$ts/stores/crash";
import { ReportOptions } from "$types/bugrep";
import { LogLevel } from "$types/console";
import { createReport, sendReport } from "../";

export function manualCrash(source: string, reason: string, stack?: string) {
  if (CRASHING.get())
    return Log(
      "bugrep/crash/window",
      "Crash prevented because another crash is already in progress!",
      LogLevel.warn
    );
  Log("ArcOS", `------(#! [ SYSTEM IS CRASHING ] !#)------`, LogLevel.error);
  const options: ReportOptions = {
    includeUserData: false,
    includeApi: true,
    title: reason,
    body: `Source: ${source}\n${stack || compileStackString()}`,
  };

  const report = createReport(options);

  CrashReport.set(report);

  Log(`bugrep/crash`, `Error: ${source}: ${reason}`, LogLevel.error);

  CRASHING.set(true);

  PrimaryState.navigate("crash");
  /* 
  if (import.meta.env.DEV)
    return Log(
      "bugrep/crash",
      "Not sending bug report in Vite environment!",
      LogLevel.warn
    );
 */
  sendReport(options);
}
