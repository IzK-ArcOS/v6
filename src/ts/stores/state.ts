import { StateHandler } from "$ts/states";

export const primaryStates: States = new Map([
  [
    "boot",
    {
      name: "Boot",
      key: "boot",
      content: null,
      attribs: {},
    },
  ],
]);

export const PrimaryState = new StateHandler("ArcOS", primaryStates);
