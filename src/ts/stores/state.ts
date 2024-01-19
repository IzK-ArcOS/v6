import ArcTerm from "$state/ArcTerm/ArcTerm.svelte";
import Boot from "$state/Boot/Boot.svelte";
import Crash from "$state/Crash/Crash.svelte";
import Desktop from "$state/Desktop/Desktop.svelte";
import FirstTimeSetup from "$state/FirstTimeSetup/FirstTimeSetup.svelte";
import TurnedOff from "$state/TurnedOff/TurnedOff.svelte";
import Login from "$state/Login/Login.svelte";
import { ArcSoundBus } from "$ts/soundbus";
import { State, States } from "$types/state";

export const primaryStates: States = new Map<string, State>([
  [
    "boot",
    {
      name: "Boot",
      key: "boot",
      content: Boot,
      attribs: {},
    },
  ],
  [
    "arcterm",
    {
      name: "ArcTerm",
      key: "arcterm",
      content: ArcTerm,
      attribs: {},
    },
  ],
  [
    "fts",
    {
      name: "First Time Setup",
      key: "fts",
      content: FirstTimeSetup,
      attribs: {},
    },
  ],
  [
    "login",
    {
      name: "Login",
      key: "login",
      content: Login,
      attribs: {
        noProcesssRenderer: true
      },
    },
  ],
  [
    "logoff",
    {
      name: "Logoff",
      content: Login,
      attribs: {
        continuation: "logoff",
        noProcesssRenderer: true
      },
      key: "logoff",
      onload() {
        ArcSoundBus.playSound("arcos.system.logoff");
      },
    },
  ],
  [
    "restart",
    {
      name: "Restart",
      content: Login,
      attribs: {
        continuation: "restart",
        noProcesssRenderer: true
      },
      key: "restart",
      onload() {
        ArcSoundBus.playSound("arcos.system.logoff");
      },
    },
  ],
  [
    "shutdown",
    {
      name: "Shutdown",
      content: Login,
      attribs: {
        continuation: "shutdown",
        noProcesssRenderer: true
      },
      key: "shutdown",
      onload() {
        ArcSoundBus.playSound("arcos.system.logoff");
      },
    },
  ],
  [
    "desktop",
    {
      name: "Desktop",
      key: "desktop",
      content: Desktop,
      attribs: {
        noProcesssRenderer: true
      },
    },
  ],
  [
    "crash",
    {
      name: "Aw, Snap!",
      key: "crash",
      content: Crash,
      attribs: {
        noProcesssRenderer: true,
        classes: "sharp noani theme-amoled"
      },
    },
  ],
  [
    "turnedoff",
    {
      name: "Turned off",
      content: TurnedOff,
      attribs: {
        noProcesssRenderer: true
      },
      key: "turnedoff",
      onload() {
        window.close();
      },
    },
  ],
]);
