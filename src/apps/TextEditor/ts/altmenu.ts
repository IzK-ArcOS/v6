import { SEP_ITEM } from "$state/Desktop/ts/store";
import { spawnApp } from "$ts/apps";
import { ContextMenuItem } from "$types/app";
import { Runtime } from "./runtime";

export const TextEditorAltMenu: (runtime: Runtime) => ContextMenuItem[] = (runtime: Runtime) => [
  {
    caption: "File",
    subItems: [
      {
        caption: "Open...",
        action: () => runtime.openFile(),
      },
      SEP_ITEM,
      {
        caption: "Save",
        action: async () => {
          await runtime.save(runtime.buffer.get());
        },
        disabled: () => !runtime.path.get(),
      },
      {
        caption: "Save As...",
        action: async () => await runtime.saveAs(runtime.buffer.get()),
      },
      SEP_ITEM,
      {
        caption: "Open file location",
        action: () => {
          const path = runtime.path.get();

          if (!path) return

          const split = path.split("/");
          const filename = split[split.length - 1];

          spawnApp("FileManager", 0, [path.replace(`/${filename}`, ""), filename])
        },
        disabled: () => !runtime.path.get()
      },
      SEP_ITEM,
      {
        caption: "Exit",
        action: () => runtime.process.handler.kill(runtime.pid, true)
      }
    ]
  },
  {
    caption: "View",
    subItems: [

      {
        caption: "Fixed-width font",
        action: () => { runtime.monospace.set(!runtime.monospace.get()) },
        isActive: () => runtime.monospace.get()
      },
      {
        caption: "Word Wrap",
        action: () => { runtime.wordWrap.set(!runtime.wordWrap.get()) },
        isActive: () => runtime.wordWrap.get()
      }
    ]
  }
]