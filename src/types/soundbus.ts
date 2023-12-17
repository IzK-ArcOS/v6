import { Params } from "./server";

export type SoundStore = Params;

export type SoundBusStore = { [key: string]: HTMLAudioElement[] };
