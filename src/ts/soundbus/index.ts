import { Log } from "$ts/console";
import { ArcSounds } from "$ts/stores/soundbus";
import { LogLevel } from "$types/console";
import { SoundBusStore, SoundStore } from "$types/soundbus";

export class SoundBus {
  private store: SoundStore = {};
  private _bus: SoundBusStore = {};

  constructor(store: SoundStore) {
    if (!store) {
      Log(
        "soundbus",
        `Can't create SoundBus without valid store.`,
        LogLevel.error
      );
      return;
    }

    this.store = store;
  }

  public playSound(id: string) {
    if (!this.store[id]) return false;

    Log("soundbus", `Playing sound ${id} from store`);

    const element = document.createElement("audio");

    element.muted = true;
    element.src = this.store[id];
    element.volume = 1;

    try {
      element.play();

      setTimeout(() => {
        element.muted = false;
      }, 10);
    } catch (e) {
      Log(
        "soundbus",
        `Can't play ${id}: User didn't interact with the page first`,
        LogLevel.error
      );

      return false;
    }

    if (!this._bus[id]) this._bus[id] = [];

    this._bus[id].push(element);

    setTimeout(() => {
      element.onended = () => delete this._bus[id];
    }, 10);

    return true;
  }

  public stopSound(id: string) {
    Log("soundbus", `Stopping ${id}`);

    if (!this._bus[id]) return false;

    const bus = this._bus[id];

    for (let i = 0; i < bus.length; i++) {
      bus[i].src = null;
      bus[i].currentTime = -1;
      bus[i].pause();
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
