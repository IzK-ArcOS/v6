import ArcTerm from "$state/ArcTerm/ArcTerm.svelte";
import Boot from "$state/Boot/Boot.svelte";
import Crash from "$state/Crash/Crash.svelte";
import FirstTimeSetup from "$state/FirstTimeSetup/FirstTimeSetup.svelte";
import Login from "$state/Login/Login.svelte";
import { States } from "$types/state";

export const primaryStates: States = new Map([
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
    "login",
    {
      name: "Login",
      key: "login",
      content: Login,
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
    "arcterm",
    {
      name: "ArcTerm",
      key: "arcterm",
      content: ArcTerm,
      attribs: {},
    },
  ],
  [
    "crash",
    {
      name: "Aw, Snap!",
      key: "crash",
      content: Crash,
      attribs: {},
    },
  ],
]);
