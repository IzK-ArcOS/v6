import { Process, ProcessHandler } from "$ts/process";
import { flushVirtualFilesystem } from "$ts/server/fs/virtual";
import { setUserData } from "$ts/server/user/data";
import { appLibrary } from "$ts/stores/apps";
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
    this.unsubscribe = UserDataStore.subscribe((v) => this.commit(v));
  }

  stop() {
    this.Log(`Stopping UDC`);

    if (!this.unsubscribe) return;

    this.unsubscribe();
    this.unsubscribe = null;

    return true;
  }

  async commit(data: UserData) {
    if (this._paused) return;

    // flushVirtualFilesystem();

    data = this._validateAppdata(data);

    await setUserData(data);
  }

  private _validateAppdata(data: UserData): UserData {
    if (!data.appdata) data.appdata = { experiments: {} };

    const library = appLibrary.get();

    for (const [id] of library) {
      if (!data.appdata[id]) data.appdata[id] = {};
    }

    return data;
  }
}

export const UserDataCommitter: Service = {
  name: "User Data Committer",
  description: "Saves user data changes to your server",
  process: UDC,
  initialState: "started",
};
