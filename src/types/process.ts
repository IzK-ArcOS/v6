import { ProcessHandler } from "$ts/process";
import { App } from "./app";
import { ReadableStore } from "./writable";

export interface Process {
  app?: App;
  start?: ProcessMethod;
  stop?: ProcessMethod;
  name: string;
}

export type ProcessMethod = (proc: Process, pid: number, handler: ProcessHandler) => any | Promise<any>;

export type Processes = ReadableStore<Map<number, Process | "disposed">>; // [pid, instance]
export type ProcessGroups = Record<string, number[]>; // appId, pid[]