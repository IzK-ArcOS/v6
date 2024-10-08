import { Log } from "$ts/console";
import { PrimaryState } from "$ts/states";
import { CRASHING, CRASH_BLACKLIST, CrashReport } from "$ts/stores/crash";
import { ReportOptions } from "$types/bugrep";
import { LogLevel } from "$types/console";
import { createReport, sendReport } from "..";

export function handleWindowError(
  e: (Event & { currentTarget: EventTarget & Element }) | PromiseRejectionEvent
) {
  if (CRASHING.get())
    return Log(
      "bugrep/crash/window",
      "Crash prevented because another crash is already in progress!",
      LogLevel.warn
    );

  const error = e as unknown as ErrorEvent;
  const rejection = e as PromiseRejectionEvent;
  const filename = error.filename || rejection.reason.name;
  const position = error.lineno ? `(${error.lineno}:${error.colno})` : "";
  const message = error.message || rejection.reason.message;
  const name = rejection.reason.name;
  const stack = error.error?.stack || rejection.reason.stack;

  if (
    (rejection && rejection.reason && isBlackListed(rejection.reason.name)) ||
    (message && message.includes("dynamically imported module"))
  )
    return Log(
      "bugrep/crash/window",
      `Not making a report for ${name} or failed app sideload`,
      LogLevel.warn
    );

  CRASHING.set(true);

  Log("ArcOS", `------(#! [ SYSTEM IS CRASHING ] !#)------`, LogLevel.error);

  const options: ReportOptions = {
    includeUserData: false,
    includeApi: true,
    title: "Crash by irrecoverable unhandled exception",
    body: `File: ${filename} ${position}\n\n${message}\n\n${stack || "  at ArcOS (no stack)"}`,
  };

  const report = createReport(options);

  CrashReport.set(report);

  Log(`bugrep/crash/window`, `Error: ${filename}: ${message}`, LogLevel.error);

  PrimaryState.navigate("crash");

  if (import.meta.env.DEV)
    return Log("bugrep/crash/window", "Not sending bug report in Vite environment!", LogLevel.warn);

  sendReport(options);
}

export function isBlackListed(test: string) {
  if (!test) return false;

  for (const item of CRASH_BLACKLIST) {
    if (test.includes(item)) return true;
  }

  return false;
}
