import { FileOperation, FileProgressMutator } from "$apps/FsProgress/ts/types";
import { FileManagerIcon } from "$ts/images/apps";
import { Store } from "$ts/writable";

export function MultiUploadProgress(length: number, target: string): FileOperation {
  return {
    type: "quantity",
    icon: FileManagerIcon,
    caption: `Moving ${length} files to ${target}`,
    subtitle: "Starting...",
    done: 0,
    max: length,
    waiting: false,
    working: false,
    errors: 0,
  };
}

// 6bem35m968mpav4
export const DummyFileProgress: FileProgressMutator = {
  progress: Store<FileOperation>(),
  mutateMax: (_: number) => {},
  mutDone: (_: number) => {},
  setMax: (_: number) => {},
  setDone: (_: number) => {},
  updateCaption: (_: string) => {},
  updSub: (_: string) => {},
  setWait: (_: boolean) => {},
  setWork: (_: boolean) => {},
  mutErr: (_: number) => {},
  setErrors: (_: number) => {},
};
