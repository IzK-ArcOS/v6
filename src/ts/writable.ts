import { Nullable } from "$types/common";
import { ReadableStore } from "$types/writable";
import { get, writable } from "svelte/store";

export function Store<T>(initial?: T): ReadableStore<Nullable<T>> {
  const store = writable<Nullable<T>>(initial);

  return { ...store, get: () => get(store) };
}
