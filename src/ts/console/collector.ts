import { LogLevelData } from "$ts/stores/console";
import { LogItem, LogLevel } from "$types/console";
import dayjs from "dayjs";
import { get } from "svelte/store";
import { LogStore } from "./logging";

export type CollectorResult = { [key: string]: LogItem[] };
export type IterableCollectorResult = [string, LogItem[]][];

export function collectLogsBySource(reverse = false): CollectorResult {
  let logs = get(LogStore);

  if (reverse) logs = logs.reverse();

  let sources = [];
  let items: CollectorResult = {};

  for (const log of logs) {
    if (!sources.includes(log.source)) {
      sources.push(log.source);
    }

    items[log.source] = Array.prototype.concat(items[log.source] || [], [log]);
  }

  return items;
}

export function compileStringLog(): string[] {
  const result: string[] = [];
  const logs = get(LogStore);

  for (const log of logs) {
    const caption = LogLevelData[LogLevel[log.level]].capt;
    const time = dayjs(log.timestamp || 0).format("HH:mm:ss.mmm");

    result.push(`${time} [${caption}] ${log.source}: ${log.msg}`);
  }

  return result;
}
