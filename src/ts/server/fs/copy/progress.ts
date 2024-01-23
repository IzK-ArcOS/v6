import { FileManagerIcon } from "$ts/images/apps";
import { sleep } from "$ts/util";
import { renameItem } from ".";
import { CreateFileProgress } from "../progress";
import { pathToFriendlyName, pathToFriendlyPath } from "../util";

export async function renameMultipleProgressy(items: Record<string, string>) {
  const values = Object.values(items);

  if (!values.length) return;

  const length = values.length;
  const target = pathToFriendlyName(values[0]);
  const { mutateDone, updateSubtitle } = await CreateFileProgress({
    type: "quantity",
    icon: FileManagerIcon,
    caption: `Moving ${length} files to ${target}...`,
    subtitle: "Waiting...",
    done: 0,
    max: length
  })

  for (const source in items) {
    const friendly = pathToFriendlyPath(source);
    const dest = items[source];

    updateSubtitle(friendly);

    await renameItem(source, dest);

    mutateDone(+1);
    updateSubtitle(`${friendly} ...`)

    await sleep(110);
  }
}

export async function copyMultipleProgressy(items: Record<string, string>) {
  const values = Object.values(items);

  if (!values.length) return;

  const length = values.length;
  const target = pathToFriendlyName(values[0]);
  const { mutateDone, updateSubtitle } = await CreateFileProgress({
    type: "quantity",
    icon: FileManagerIcon,
    caption: `Copying ${length} files to ${target}...`,
    subtitle: "Starting...",
    done: 0,
    max: length
  })

  for (const source in items) {
    const friendly = pathToFriendlyPath(source);
    const dest = items[source];

    updateSubtitle(friendly);

    await renameItem(source, dest);

    mutateDone(+1);
    updateSubtitle(`${friendly} ...`)

    await sleep(110);
  }
}