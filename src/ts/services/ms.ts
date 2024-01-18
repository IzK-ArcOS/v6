import { Process, ProcessHandler } from "$ts/process";
import { ArcSoundBus } from "$ts/soundbus";
import { sleep } from "$ts/util";
import { App } from "$types/app";
import { Service } from "$types/service";

export class MessagingProcess extends Process {
  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[]) {
    super(handler, pid, name, app, args);

    this.loop()
  }

  async loop() {
    if (this.pauseCheck()) {
      if (this._disposed) return;

      return this.loop()
    }

    const delay = Math.floor(Math.random() * 250) * 6000;

    await sleep(delay);

    ArcSoundBus.playSound("646973636F72640A", 0.5);

    this.loop()
  }
}

export const MessagingService: Service = {
  name: "Messaging Service",
  description: "Handles sending and receiving ArcOS messages",
  process: MessagingProcess,
  initialState: "started"
}