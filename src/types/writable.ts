import { Writable } from "svelte/store";

export type ReadableStore<T> = {
  get: () => T;
} & Writable<T>;
