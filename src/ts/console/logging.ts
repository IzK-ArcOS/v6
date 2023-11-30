import { writable } from "svelte/store";
import { LogLevelData } from "./store";
import dayjs from "dayjs";
import { type LogItem, LogLevel } from "$types/console";

export const LogStore = writable<LogItem[]>([]);
export const CurrentLogItem = writable<LogItem>({
  level: LogLevel.info,
  source: "Console",
  msg: "Idle",
});

CurrentLogItem.subscribe((v) => {
  /* if (ARCOS_MODE != "development") return; */
  document.title = `ArcOS v6 | ${v.source} - ${v.msg}`;
});

export function Log(source: string, msg: string, level = LogLevel.info) {
  const data: LogItem = { source, msg, level };

  data.timestamp = new Date().getTime();

  const levelCaption = LogLevelData[LogLevel[data.level]].capt;
  const timestamp = dayjs(data.timestamp || 0).format("HH:mm:ss.mmm");

  LogStore.update((currentLog) => {
    currentLog.push(data);

    CurrentLogItem.set(data);

    return currentLog;
  });

  if (data.level == LogLevel.critical)
    // TODO: restore this
    /* sendReport({
      includeUserData: false,
      includeApi: true,
      title: `Critical state`,
      body: `A log item with state CRITICAL was sent:\n${source}: ${msg}\n\nTS: ${timestamp}`,
    }); */

    console.log(
      `ArcOS: ${timestamp} [${levelCaption}] ${data.source}: ${data.msg}`
    );
}
