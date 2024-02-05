import { Log } from "$ts/console";
import { TrashIcon } from "$ts/images/general";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { sleep } from "$ts/util";
import { deleteItem } from ".";
import { FileProgress } from "../progress";
import { pathToFriendlyName, pathToFriendlyPath } from "../util";

export async function deleteItemProgressy(path: string, dispatch = true, pid?: number, noShade = false): Promise<boolean> {
  Log("server/fs/delete", `Deleting ${path}`);

  const { mutDone, setWork, mutErr } = await FileProgress({
    type: "quantity",
    icon: TrashIcon,
    caption: `Permanently deleting ${pathToFriendlyName(path)}`,
    subtitle: pathToFriendlyName(path),
    done: 0,
    max: 1,
    working: false,
    waiting: false,
    errors: 0
  }, pid, noShade)

  setWork(true);

  const deleted = await deleteItem(path, dispatch)

  if (!deleted) mutErr(+1);

  setWork(false);
  mutDone(+1);

  return deleted;
}

export async function deleteMultipleProgressy(paths: string[], pid?: number, noShade = false) {
  Log("server/fs/delete", `Deleting ${paths.length} items`);

  const { mutDone, updSub, setWork, setWait, mutErr } = await FileProgress({
    type: "quantity",
    icon: TrashIcon,
    caption: `Permanently deleting ${paths.length} items`,
    subtitle: "Starting...",
    done: 0,
    max: paths.length,
    working: false,
    waiting: false,
    errors: 0
  }, pid, noShade)

  for (const path of paths) {
    const friendly = pathToFriendlyPath(path);

    setWait(false);
    setWork(true);
    updSub(friendly);

    const deleted = await deleteItem(path, false);

    if (!deleted) mutErr(+1)

    setWork(false);
    setWait(true);
    mutDone(+1);

    await sleep(55) // rate-limit cooldown
  }

  mutDone(+1);

  GlobalDispatch.dispatch("fs-flush")
}