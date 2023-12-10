import { Log } from "$ts/console";
import { App } from "$types/app";
import { LogLevel } from "$types/console";
import { writable } from "svelte/store";

export class AppRuntime {
  app: App;
  public PAGES = [];
  public readonly CurrentPage = writable<string>("");
  public pid: number;

  constructor(appData: App) {
    if (!appData.id) {
      Log(
        `apps/runtime`,
        `Can't create AppRuntime without valid app ID`,
        LogLevel.error
      );

      return;
    }

    this.app = appData;
  }

  public Log(
    message: string,
    fn: string = "<anonymous>",
    level = LogLevel.info
  ) {
    Log(`${this.app.id}Runtime: ${fn}`, message, level);
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
    this.pid = pid;
  }
}
