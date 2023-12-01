import Boot from "$state/Boot/Boot.svelte";
import Crash from "$state/Crash/Crash.svelte";
import { Login } from "$state/Login/ts/main";
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
    "crash",
    {
      name: "Aw, Snap!",
      key: "crash",
      content: Crash,
      attribs: {},
    },
  ],
]);
