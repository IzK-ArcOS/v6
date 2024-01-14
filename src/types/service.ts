import { Process } from "$ts/process";
import { ReadableStore } from "./writable";

export interface Service {
  name: string;
  description: string;
  process: typeof Process;
  pid?: number;
  id?: string;
  initialState?: InitialServiceState;
  loadedAt?: number;
  changedAt?: number;
}

export type ServiceStore = Map<string, Service>;
export type ReadableServiceStore = ReadableStore<ServiceStore>;
export type InitialServiceState = "stopped" | "started";