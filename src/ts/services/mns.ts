import { SafeMode } from "$state/Desktop/ts/store";
import { spawnApp } from "$ts/apps";
import { MessagingIcon } from "$ts/images/apps";
import { sendNotification } from "$ts/notif";
import { Process, ProcessHandler } from "$ts/process";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { getUnreadMessages } from "$ts/server/messaging/get";
import { filterPartialMessageBody, parseTitle } from "$ts/server/messaging/utils";
import { getUserPfp } from "$ts/server/user/pfp";
import { PrimaryState } from "$ts/states";
import { ProcessStack } from "$ts/stores/process";
import { sleep } from "$ts/util";
import { App } from "$types/app";
import { PartialMessage } from "$types/messaging";
import { Service } from "$types/service";

export class MessageNotifierProcess extends Process {
  BLACKLIST: string[] = [];
  FREQUENCY = 1000 * 60; // Every 60 seconds

  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[]) {
    super(handler, pid, name, app, args);
  }

  public async start() {
    await sleep(500);

    setInterval(async () => {
      if (this._paused) return;

      await this.Tick();
    }, this.FREQUENCY);

    this.Tick();
  }

  public async Tick() {
    const unreads = (await getUnreadMessages(200))
      .sort((a, b) => b.timestamp - a.timestamp)
      .filter((m) => !this.BLACKLIST.includes(m.id));

    const message = unreads[0];

    if (!unreads.length || !message) return;

    GlobalDispatch.dispatch("message-flush");

    this.BLACKLIST.push(message.id);

    await this._notify(message);
  }

  private async _notify(message: PartialMessage) {
    const pfp = await getUserPfp(message.sender, MessagingIcon);

    const { title, body } = parseTitle(message.partialBody);

    sendNotification({
      title: `${message.sender}: ${title}`,
      message: `${filterPartialMessageBody(body)}`,
      image: pfp,
      buttons: [{ caption: "Open Message", action: () => this._open(message.id) }],
    });
  }

  private async _open(id: string) {
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
  startCondition: () => PrimaryState.current.get().key == "desktop" && !SafeMode.get(),
};
