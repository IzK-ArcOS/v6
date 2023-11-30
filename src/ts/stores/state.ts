import { StateHandler } from "$ts/states";
import { States } from "$types/state";
import Boot from "$state/Boot/Boot.svelte";

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
]);

export const PrimaryState = new StateHandler("ArcOS", primaryStates, "boot");
