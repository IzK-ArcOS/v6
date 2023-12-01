import { Log } from "$ts/console";
import { PrimaryState } from "$ts/states";
import { CrashReport } from "$ts/stores/crash";
import { ReportOptions } from "$types/bugrep";
import { LogLevel } from "$types/console";
import { createReport, sendReport } from "../";

export function manualCrash(source: string, reason: string, stack?: string) {
  Log("ArcOS", `------(#! [ SYSTEM IS CRASHING ] !#)------`, LogLevel.error);
  const options: ReportOptions = {
    includeUserData: false,
    includeApi: true,
    title: reason,
    body: `Source: ${source}\n\n${stack || "  at ArcOS (no stack)"}`,
  };

  const report = createReport(options);

  CrashReport.set(report);

  Log(`Error: ${source}`, reason, LogLevel.error);

  setTimeout(() => {
    PrimaryState.navigate("crash");
  }, 2000);

  if (import.meta.env.DEV)
    return Log(
      "reporting/crash.ts: manualCrash",
      "Not sending a report in dev env, we ain't spammin' da servers!",
      LogLevel.warn
    );

  sendReport(options);
}

export async function setCrashHandlers() {}
