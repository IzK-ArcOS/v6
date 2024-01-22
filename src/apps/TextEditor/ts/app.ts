import { DefaultIcon } from "$ts/images/apps";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const TextEditor: App = {
  metadata: {
    name: "Text Editor",
    description: "Read and edit plain-text files",
    author: "ArcOS Team",
    version: "2.0.0",
    icon: DefaultIcon,
    appGroup: "utilities",
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "TextEditor",
  size: { w: 700, h: 450 },
  minSize: { w: 700, h: 450 },
  maxSize: { w: 1300, h: 900 },
  pos: { x: 60, y: 60 },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: true,
  },
  controls: {
    minimize: true,
    maximize: true,
    close: true,
  },

};
