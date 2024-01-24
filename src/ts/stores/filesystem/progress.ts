import { FileOperation } from "$apps/FsProgress/ts/types";
import { FileManagerIcon } from "$ts/images/apps";

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
    errors: 0
  }
}