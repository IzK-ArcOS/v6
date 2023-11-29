import { get, writable } from "svelte/store";
import { ReadableStore } from "$types/writable";
import { Nullable } from "$types/common";

export function Store<T>(initial?: T): ReadableStore<Nullable<T>> {
  const store = writable<Nullable<T>>(initial);

  return { ...store, get: () => get(store) };
}
