import { Process } from "$ts/process";
import { App } from "./app";
import { Nullable } from "./common";
import { ReadableStore } from "./writable";

export type Processes = ReadableStore<ProcessMap>; // [pid, instance]
export type ProcessGroups = Record<string, number[]>; // appId, pid[]
export type ProcessMap = Map<number, Process>;
export type ProcessSpawnArguments = {
  proc: typeof Process;
  name: string;
  parentPid?: number;
  app?: App;
  args?: any;
};