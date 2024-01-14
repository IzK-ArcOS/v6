import { Process } from "$ts/process";
import { MaybePromise } from "./common";
import { ReadableStore } from "./writable";

export interface Service {
  name: string;
  description: string;
  process: typeof Process;
  startCondition?: () => MaybePromise<boolean>;
  pid?: number;
  id?: string;
  initialState?: InitialServiceState;
  loadedAt?: number;
  changedAt?: number;
}

export type ServiceStore = Map<string, Service>;
export type ReadableServiceStore = ReadableStore<ServiceStore>;
export type InitialServiceState = "stopped" | "started";
export type ServiceStartResult =
  "err_noExist" |
  "err_alreadyRunning" |
  "err_startCondition" |
  "err_spawnFailed" |
  "err_noManager" |
  "started"