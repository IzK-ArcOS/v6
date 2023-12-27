import { Store } from "$ts/writable";
import { Nullable } from "$types/common";
import { ProcessReadableStore, ProcessStoreValue, ProcessSubscriberCallback } from "$types/process";
import { ReadableStore } from "$types/writable";
import { Process } from "./instance";

export function Processes(store?: ProcessReadableStore): ProcessReadableStore {
  const map = new Map<number, Process>()
  const subscribers: ProcessSubscriberCallback[] = [];

  function startProcessSync() {
    if (!store) return;

    store.subscribe((v) => {

    })
  }

  function get(): ProcessStoreValue {
    const result: ProcessStoreValue = [];

    for (const entry of map) {
      result.push(entry);
    }

    return result;
  }

  function getOne(pid: number): Nullable<Process> {
    return map.has(pid) ? map.get(pid) : null;
  }

  function has(pid: number) {
    return !!getOne(pid);
  }

  function set(pid: number, proc: Process) {
    if (getOne(pid)) return false;

    map.set(pid, proc);

    triggerSubscribers();

    return true;
  }

  function triggerSubscribers() {
    const value = get();

    for (let i = 0; i < subscribers.length; i++) {
      subscribers[i](value);
    }
  }

  function subscribe(cb: (v: ProcessStoreValue) => void) {
    subscribers.push(cb);

    cb(get());
  }

  const mirror = Store<ProcessStoreValue>();

  subscribe((v) => mirror.set(v));

  startProcessSync()

  return { get, getOne, set, subscribe, has, mirror }
}
