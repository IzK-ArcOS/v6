import { DefaultIcon } from "$ts/images/apps";
import { ARCOS_MODE } from "$ts/metadata";
import { ConnectedServer } from "$ts/stores/server";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const LogListApp: App = {
  metadata: {
    name: "Log List",
    description: "The log.. as a list.",
    author: "Test App",
    version: "0.0.0",
    icon: DefaultIcon,
    appGroup: "internal",
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "LogList",
  size: { w: 480, h: 640 },
  minSize: { w: 480, h: 640 },
  maxSize: { w: NaN, h: NaN },
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
  glass: false,
  loadCondition: () => ARCOS_MODE == "development"
};
