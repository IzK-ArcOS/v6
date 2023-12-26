import { Process } from "$ts/process";
import { App } from "./app";
import { Nullable } from "./common";

export type ProcessGroups = Record<string, number[]>; // appId, pid[]
export type ProcessMap = Map<number, Process>;
export type ProcessSpawnArguments = {
  proc: typeof Process;
  name: string;
  parentPid?: number;
  app?: App;
  args?: any;
};

export type ProcessStoreValue = [number, Process][];
export type ProcessSubscriberCallback = (v: ProcessStoreValue) => void;
export type ProcessReadableStore = {
  get(): ProcessStoreValue;
  getOne(pid: number): Nullable<Process>;
  set(pid: number, proc: Process): boolean;
  subscribe(cb: ProcessSubscriberCallback): void;
  has(pid: number): boolean;
}