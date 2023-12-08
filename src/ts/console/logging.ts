import { ARCOS_MODE } from "$ts/metadata/mode";
import { LogLevelData } from "$ts/stores/console";
import dayjs from "dayjs";
import { writable } from "svelte/store";
import { LogItem, LogLevel } from "../../types/console";
import { Store } from "$ts/writable";

export const LogStore = Store<LogItem[]>([]);
export const CurrentLogItem = writable<LogItem>({
  level: LogLevel.info,
  source: "Console",
  msg: "Idle",
});

CurrentLogItem.subscribe((v) => {
  if (ARCOS_MODE != "development") return;

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

  // TODO: Restore BugRep logic
  /*if (data.level == LogLevel.critical)
    sendReport({
      includeUserData: false,
      includeApi: true,
      title: `Critical state`,
      body: `A log item with state CRITICAL was sent:\n${source}: ${msg}\n\nTS: ${timestamp}`,
    }); */

  console.log(
    `ArcOS: ${timestamp} [${levelCaption}] ${data.source}: ${data.msg}`
  );
}
