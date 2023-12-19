import { Log } from "$ts/console";
import { App } from "$types/app";
import { Nullable } from "$types/common";
import { LogLevel } from "$types/console";
import { ProcessHandler } from "./handler";

export class Process {
  public _disposed = false;
  public app: Nullable<App> = null;
  public parentPid: Nullable<number> = null;
  public args: any[] = [];

  constructor(
    public readonly handler: ProcessHandler,
    public pid: number,
    public name: string,
    app?: App,
    ...args: any[]
  ) {
    this.app = app;
    this.args = args;
  }

  public setParentPid(pid: number) {
    if (!this.handler.isPid(pid) || this.parentPid) return false;

    this.parentPid = pid;
  }

  public Log(text: string, level?: LogLevel) {
    Log(
      "process/instance",
      `ProcessHandler[${this.handler.id}][${this.name}]: ${text}`,
      level
    );
  }

  start(): any {
    // PLACEHOLDER
  }

  stop(): any {
    // PLACEHOLDER
  }
}
