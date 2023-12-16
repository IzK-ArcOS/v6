import { appLibrary } from "$ts/stores/apps";
import { ProcessStack } from "$ts/stores/process";
import { getAppById } from "./utils";

export function spawnApp(id: string): boolean {
  const library = appLibrary.get();

  if (!library.has(id)) return false;

  ProcessStack.spawn({ app: getAppById(id), name: `App ${id}` })
}