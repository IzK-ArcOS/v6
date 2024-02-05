import { FileManagerIcon } from "$ts/images/apps";
import { MultiUploadProgress } from "$ts/stores/filesystem/progress";
import { sleep } from "$ts/util";
import { copyItem, renameItem } from ".";
import { FileProgress } from "../progress";
import { pathToFriendlyName, pathToFriendlyPath } from "../util";

export async function renameMultipleProgressy(items: Record<string, string>, pid?: number, noShade = false) {
  const values = Object.values(items);

  if (!values.length) return;

  const length = values.length;
  const target = pathToFriendlyName(values[0]);
  const { mutDone, updSub, setWork, mutErr, setWait } = await FileProgress(MultiUploadProgress(length, target), pid, noShade)

  for (const source in items) {
    const friendly = pathToFriendlyPath(source);
    const dest = items[source];

    updSub(friendly);
    setWork(true);
    setWait(false);

    const renamed = await renameItem(source, dest);

    if (!renamed) mutErr(+1);

    mutDone(+1);
    setWait(true);
    setWork(false);

    await sleep(55);
  }
}

export async function copyMultipleProgressy(items: Record<string, string>, pid?: number, noShade = true) {
  const values = Object.values(items);

  if (!values.length) return;

  const length = values.length;
  const target = pathToFriendlyName(values[0]);
  const { mutDone, updSub, setWork, mutErr, setWait } = await FileProgress({
    type: "quantity",
    icon: FileManagerIcon,
    caption: `Copying ${length} files to ${target}`,
    subtitle: "Starting...",
    done: 0,
    max: length,
    waiting: false,
    working: false,
    errors: 0
  }, pid, noShade)

  for (const source in items) {
    const friendly = pathToFriendlyPath(source);
    const dest = items[source];

    updSub(friendly);
    setWork(true);
    setWait(false);

    const copied = await copyItem(source, dest);

    if (!copied) mutErr(+1);

    mutDone(+1);
    setWait(true);
    setWork(false);

    await sleep(55);
  }
}