import { WarningIcon } from "$ts/images/dialog";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const ErrorDialog: App = {
  metadata: {
    name: "Error",
    description: "How are you seeing this?",
    author: "ArcOS Team",
    version: "1.0.0",
    icon: WarningIcon,
    appGroup: "internal",
    hidden: true
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "ErrorDialog",
  size: { w: NaN, h: NaN },
  minSize: { w: NaN, h: 120 },
  maxSize: { w: 500, h: NaN },
  pos: { x: 60, y: 60 },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: false,
  },
  controls: {
    minimize: false,
    maximize: false,
    close: false,
  },

};
