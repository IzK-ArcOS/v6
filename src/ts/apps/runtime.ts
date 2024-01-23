import { Log } from "$ts/console";
import { Process } from "$ts/process";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { RuntimeGlobalDispatches, RuntimeScopedDispatches } from "$ts/stores/process/dispatch";
import { Store } from "$ts/writable";
import { App, ContextMenuItem } from "$types/app";
import { LogLevel } from "$types/console";
import { ReadableStore } from "$types/writable";

export class AppRuntime {
  app: App;
  public PAGES = [];
  public readonly CurrentPage = Store<string>("");
  public pid: number;
  public openedFile = Store<string>();
  public APP_NAME = "";

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

    this.APP_NAME = appData.metadata.name;
    this.app = appData;
    this.setPid(process.pid);
    this._subscribeToDispatch();
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

  public minimize() {
    this.appMutator.update((v) => {
      if (v.metadata.core) return v;

      v.state.minimized = true;

      return v
    })
  }

  public maximize() {
    this.appMutator.update((v) => {
      if (v.metadata.core || v.state.snapping) return v;

      v.state.maximized = true;
      v.state.minimized = false;

      return v
    })
  }

  public restore() {
    this.appMutator.update((v) => {
      if (v.metadata.core) return v;

      v.state.maximized = false;

      return v
    })
  }


  private _subscribeToDispatch() {
    const globals = RuntimeGlobalDispatches(this);
    const scoped = RuntimeScopedDispatches(this);

    for (const event in globals) {
      GlobalDispatch.subscribe(event, () => globals[event]());
    }

    for (const event in scoped) {
      this.process.handler.dispatch.subscribe(this.pid, event, (data: any[]) => scoped[event](data))
    }
  }

  public handleOpenFile(path: string) {
    this.openedFile.set(path);
  }

  public loadAltMenu(...menu: ContextMenuItem[]) {
    this.appMutator.update((v) => {
      v.altMenu = menu;

      return v;
    })
  }

  public setWindowTitle(text: string, afterAppName = false) {
    this.appMutator.update((v) => {
      v.metadata.name = afterAppName ? `${this.APP_NAME} - ${text}` : text;

      return v
    })
  }
}
