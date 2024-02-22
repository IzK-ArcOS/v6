import { ARCOS_MODE } from "$ts/metadata/mode";
import { LogLevelData } from "$ts/stores/console";
import { Store } from "$ts/writable";
import { LogItem, LogLevel } from "$types/console";
import dayjs from "dayjs";
import { writable } from "svelte/store";
import { pushToStack } from "./stack";

export const LogStore = Store<LogItem[]>([]);
export const CurrentLogItem = writable<LogItem>({
  level: LogLevel.info,
  source: "Console",
  msg: "Idle",
});

CurrentLogItem.subscribe((v) => {
  if (ARCOS_MODE != "development") return;

  document.title = `ArcOS | ${v.source} - ${v.msg}`;
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

  pushToStack(source);

  console.log(`ArcOS: ${timestamp} [${levelCaption}] ${data.source}: ${data.msg}`);
}
