import { Process } from "$ts/process";
import { ReadableStore } from "./writable";

export type Processes = ReadableStore<ProcessMap>; // [pid, instance]
export type ProcessGroups = Record<string, number[]>; // appId, pid[]
export type ProcessMap = Map<number, Process>;