import { FileOperation, FileProgressMutator } from "$apps/FsProgress/ts/types";
import { getAppById, spawnApp, spawnOverlay } from "$ts/apps";
import { Store } from "$ts/writable";

export async function FileProgress(initialData: FileOperation, parentPid?: number, noShade = true): Promise<FileProgressMutator> {
  const progress = Store<FileOperation>(initialData);

  if (!parentPid) {

    const process = await spawnApp("FsProgress", 0, [progress]);

    if (typeof process == "string") return null
  } else {
    const process = await spawnOverlay(getAppById("FsProgress"), parentPid, [progress], noShade);

    if (typeof process == "string") return null
  }

  const mutateMax = (mutator: number) => progress.update((v) => {
    v.max += mutator;
    return v;
  })

  const mutDone = (mutator: number) => progress.update((v) => {
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

  const updSub = (subtitle: string) => progress.update((v) => {
    v.subtitle = subtitle;
    return v;
  })

  const setWait = (waiting: boolean) => progress.update((v) => {
    v.waiting = waiting;
    return v;
  })

  const setWork = (working: boolean) => progress.update((v) => {
    v.working = working;
    return v;
  })

  const mutErr = (mutator: number) => progress.update((v) => {
    v.errors += mutator;
    return v;
  })

  const setErrors = (value: number) => progress.update((v) => {
    v.errors = value;
    return v;
  })

  return {
    progress,
    mutateMax,
    mutDone,
    updateCaption,
    updSub,
    setMax,
    setDone,
    setWait,
    setWork,
    mutErr,
    setErrors
  };
}