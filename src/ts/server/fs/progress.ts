import { FileOperation, FileProgressMutator } from "$apps/FsProgress/ts/types";
import { spawnApp } from "$ts/apps";
import { Store } from "$ts/writable";
import { ReadableStore } from "$types/writable";

export async function CreateFileProgress(initialData: FileOperation): Promise<FileProgressMutator> {
  const progress = Store<FileOperation>(initialData);
  const process = await spawnApp("FsProgress", 0, [progress]);

  if (typeof process == "string") return null

  const mutateMax = (mutator: number) => progress.update((v) => {
    v.max += mutator;
    return v;
  })

  const mutateDone = (mutator: number) => progress.update((v) => {
    v.done += mutator;
    return v;
  })

  const setMax = (value: number) => progress.update((v) => {
    v.max = value;
    return v;
  })

  const setDone = (value: number) => progress.update((v) => {
    v.done = value;
    return v;
  })

  const updateCaption = (caption: string) => progress.update((v) => {
    v.caption = caption;
    return v;
  })

  const updateSubtitle = (subtitle: string) => progress.update((v) => {
    v.subtitle = subtitle;
    return v;
  })

  return { progress, mutateMax, mutateDone, updateCaption, updateSubtitle, setMax, setDone };
}