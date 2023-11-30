import { Store } from "$ts/writable";
import { Server } from "$types/server";

export const ConnectedServer = Store<Server>(null);

export const TEST_MODES: [boolean, number][] = [
  [true, 443],
  [false, 3333],
  [true, 80],
  [false, 80],
  [true, 3333],
];
