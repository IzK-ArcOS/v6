import { spawnApp } from "$ts/apps";
import { MessagingIcon } from "$ts/images/apps";
import { sendNotification } from "$ts/notif";
import { Process, ProcessHandler } from "$ts/process";
import { getUnreadMessages } from "$ts/server/messaging/get";
import { filterPartialMessageBody } from "$ts/server/messaging/utils";
import { getUserPfp } from "$ts/server/user/pfp";
import { ProcessStack } from "$ts/stores/process";
import { sleep } from "$ts/util";
import { App } from "$types/app";
import { PartialMessage } from "$types/messaging";
import { Service } from "$types/service";

export class MessageNotifierProcess extends Process {
  BLACKLIST: string[] = [];
  FREQUENCY = 1000 * 60; // Every 60 seconds

  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[]) {
    console.log("MNS CONSTRUCT!");

    super(handler, pid, name, app, args);
  }

  public async start() {
    console.log("MNS START!");
    await sleep(500);

    setInterval(async () => {
      console.log("MNS INTERVAL!");

      if (this._paused) return;

      await this.Tick();
    }, this.FREQUENCY);

    this.Tick();
  }

  public async Tick() {
    console.log("MNS TICK!");
    const unreads = (await getUnreadMessages())
      .sort((a, b) => b.timestamp - a.timestamp)
      .filter((m) => !this.BLACKLIST.includes(m.id));

    const message = unreads[0];

    if (!unreads.length || !message) return console.log("MNS TICK ERROR!", unreads, message);

    this.BLACKLIST.push(message.id);

    await this._notify(message);
  }

  private async _notify(message: PartialMessage) {
    console.log("MNS NOTIFY!");

    const pfp = await getUserPfp(message.sender, MessagingIcon);

    sendNotification({
      title: `${message.sender}`,
      message: `${filterPartialMessageBody(message.partialBody)}...`,
      image: pfp,
      buttons: [{ caption: "Open Message", action: () => this._open(message.id) }],
    });
  }

  private async _open(id: string) {
    console.log("MNS OPEN!");

    const pids = ProcessStack.getAppPids("MessagingApp");

    if (!pids.length) return await spawnApp("MessagingApp", 0, [id]);

    return ProcessStack.dispatch.dispatchToPid(pids[0], "open-message", id);
  }
}

export const MessageNotifierService: Service = {
  process: MessageNotifierProcess,
  initialState: "started",
  name: "Message Notifier Service",
  description: "Continuously checks for incoming ArcOS messages",
};
