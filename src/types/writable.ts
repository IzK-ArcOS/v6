import { Writable } from "svelte/store";
import { Nullable } from "./common";

export type ReadableStore<T> = {
  get: () => Nullable<T>;
} & Writable<Nullable<T>>;
