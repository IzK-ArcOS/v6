import { App } from "$types/app";
import { ProcessGroups } from "$types/process";

export function getProcessGroups(processes: Map<number, App | "disposed">): ProcessGroups {
  const result: ProcessGroups = {};

  for (const [pid, proc] of processes) {
    if (proc == "disposed") continue;

    if (result[proc.id]) {
      result[proc.id].push(pid);

      continue;
    }

    result[proc.id] = [pid]
  }

  return result;
}