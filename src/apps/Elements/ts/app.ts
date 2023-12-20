import { DefaultIcon } from "$ts/images/apps";
import { ARCOS_MODE } from "$ts/metadata";
import { ConnectedServer } from "$ts/stores/server";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const ElementsApp: App = {
  metadata: {
    name: "ElementsApp",
    description: "Testing the UI",
    author: "Test App",
    version: "0.0.0",
    icon: DefaultIcon,
    appGroup: "internal",
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "ElementsApp",
  size: { w: 800, h: 600 },
  minSize: { w: 480, h: 300 },
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
  loadCondition: () => ARCOS_MODE == "development" && ConnectedServer.get().host.includes("v6")
};
