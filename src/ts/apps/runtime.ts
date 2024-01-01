import { Log } from "$ts/console";
import { Process } from "$ts/process";
import { App } from "$types/app";
import { LogLevel } from "$types/console";
import { ReadableStore } from "$types/writable";
import { writable } from "svelte/store";

export class AppRuntime {
  app: App;
  public PAGES = [];
  public readonly CurrentPage = writable<string>("");
  public pid: number;

  constructor(
    appData: App,
    public appMutator: ReadableStore<App>,
    public process: Process
  ) {
    if (!appData.id) {
      this.Log(
        `Can't create AppRuntime without valid app ID`,
        "constructor",
        LogLevel.error
      );

      return;
    }

    this.app = appData;
    this.setPid(process.pid);
  }

  public Log(
    message: string,
    fn: string = "<anonymous>",
    level = LogLevel.info
  ) {
    Log(`${this.app.id}Runtime`, `${fn}: ${message}`, level);
  }

  public switchPage(page: string): boolean {
    this.Log(`Switching page to ${page}`, "switchPage");

    if (!this.PAGES.includes(page)) {
      this.Log(`Page ${page} doesn't exist!`, "switchPage", LogLevel.error);

      return false;
    }

    this.CurrentPage.set(page);
    this.onSwitchPage();

    return true;
  }

  public onSwitchPage() {
    this.Log("Page changed!", "onSwitchPage");
  }

  public setPid(pid: number) {
    this.Log(`Setting PID to ${pid}`, "setPid")
    this.pid = pid;
  }
}
