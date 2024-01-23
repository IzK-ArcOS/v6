import { Log } from "$ts/console";
import { TrashIcon } from "$ts/images/general";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { sleep } from "$ts/util";
import { deleteItem } from ".";
import { CreateFileProgress } from "../progress";
import { pathToFriendlyName, pathToFriendlyPath } from "../util";

export async function deleteItemProgressy(path: string, dispatch = true): Promise<boolean> {
  Log("server/fs/delete", `Deleting ${path}`);

  const { mutateDone } = await CreateFileProgress({
    type: "quantity",
    icon: TrashIcon,
    caption: `Permanently deleting ${pathToFriendlyName(path)}...`,
    subtitle: pathToFriendlyName(path),
    done: 0,
    max: 1
  })

  const deleted = await deleteItem(path, dispatch)

  mutateDone(+1);

  return deleted;
}

export async function deleteMultipleProgressy(paths: string[]) {
  Log("server/fs/delete", `Deleting ${paths.length} items`);

  const { mutateDone, updateSubtitle } = await CreateFileProgress({
    type: "quantity",
    icon: TrashIcon,
    caption: `Permanently deleting ${paths.length} items...`,
    subtitle: "Starting...",
    done: 0,
    max: paths.length
  })

  for (const path of paths) {
    const friendly = pathToFriendlyPath(path);

    updateSubtitle(friendly);

    await deleteItem(path, false);

    mutateDone(+1);
    updateSubtitle(`${friendly} ...`);

    await sleep(350) // rate-limit cooldown
  }

  mutateDone(+1);

  GlobalDispatch.dispatch("fs-flush")
}