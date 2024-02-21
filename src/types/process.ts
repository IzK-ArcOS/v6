import { Process } from "$ts/process";
import { App } from "./app";
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
export type ProcessSpawnResult = "success" | "err_disabled" | "err_aboveLimit";
export type ProcessKillResult =
  | "success"
  | "err_elevation"
  | "err_criticalProcess"
  | "err_disposed"
  | "err_noExist"
  | "err_killCancel";
