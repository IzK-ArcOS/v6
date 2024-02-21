import { Process } from "$ts/process";

export interface AppKeyCombination {
  alt?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  key?: string;
  action(proc: Process): void;
  global?: boolean;
}

export type AppKeyCombinations = AppKeyCombination[];
