import { ClosedPids, processes } from "$ts/stores/apps";
import { App } from "$types/app";
import { Nullable } from "$types/common";

export function isPid(n: number): boolean {
  const procs = processes.get();
  const closedPids = ClosedPids.get();

  return !!procs.has(n) || closedPids.includes(n);
}

export function getProcess(pid: number): Nullable<App | "disposed"> {
  const procs = processes.get();

  if (!procs.has(pid)) return null;

  return procs.get(pid);
}