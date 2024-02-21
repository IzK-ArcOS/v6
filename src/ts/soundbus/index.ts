import { Log } from "$ts/console";
import { ArcSounds } from "$ts/stores/soundbus";
import { LogLevel } from "$types/console";
import { SoundBusStore, SoundStore } from "$types/soundbus";

export class SoundBus {
  private store: SoundStore = {};
  private _bus: SoundBusStore = {};

  constructor(store: SoundStore) {
    if (!store) {
      Log("soundbus", `Can't create SoundBus without valid store.`, LogLevel.error);
      return;
    }

    this.store = store;
  }

  public playSound(id: string, volume = 1) {
    if (!this.store[id]) return false;

    Log("soundbus", `Playing sound ${id} from store`);

    const element = document.createElement("audio");

    element.src = this.store[id];
    element.volume = volume;
    element.autoplay = true;

    if (!this._bus[id]) this._bus[id] = [];

    this._bus[id].push(element);

    element.onended = () =>
      setTimeout(() => {
        delete this._bus[id];
      }, 1000);

    return true;
  }

  public stopSound(id: string) {
    Log("soundbus", `Stopping ${id}`);

    if (!this._bus[id]) return false;

    const bus = this._bus[id];

    for (const player of bus) {
      player.src = null;
      player.currentTime = -1;
      player.pause();
    }

    return true;
  }

  public getStore(): [string, string][] {
    return Object.entries(this.store);
  }

  public loadExternal(source: string, play: boolean = false) {
    const uuid = `${Math.floor(Math.random() * 1e9)}`;

    this.store[uuid] = source;

    if (play) this.playSound(uuid);
  }
}

export const ArcSoundBus = new SoundBus(ArcSounds);
