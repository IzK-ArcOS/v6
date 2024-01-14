import { Process, ProcessHandler } from "$ts/process";
import { setUserData } from "$ts/server/user/data";
import { UserDataStore } from "$ts/stores/user";
import { App } from "$types/app";
import { Service } from "$types/service";
import { UserData } from "$types/user";
import { Unsubscriber } from "svelte/store";

class UDC extends Process {
  unsubscribe: Unsubscriber;

  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[]) {
    super(handler, pid, name, app, args);
  }

  start() {
    this.Log(`Starting UDC`);
    this.unsubscribe = UserDataStore.subscribe((v) => this.commit(v))
  }

  stop() {
    this.Log(`Stopping UDC`);

    if (!this.unsubscribe) return;

    this.unsubscribe();
    this.unsubscribe = null
  }

  async commit(data: UserData) {
    if (this._paused) return;

    await setUserData(data);
  }
}

export const UserDataCommitter: Service = {
  name: "User Data Committer",
  description: "Saves user data changes to your server",
  process: UDC,
  initialState: "started"
}