import { Log } from "$ts/console";
import { App } from "$types/app";
import { Nullable } from "$types/common";
import { LogLevel } from "$types/console";
import { ProcessHandler } from "./handler";

export class Process {
  public _disposed = false;
  public app: Nullable<App> = null;

  constructor(private readonly handler: ProcessHandler, public pid: number, public name: string, app?: App) {
    this.app = app;
  }

  public Log(text: string, level?: LogLevel) {
    Log("process/instance", `ProcessHandler[${this.handler.id}][${this.name}]: ${text}`, level)
  }

  start(): any {
    // PLACEHOLDER
  }

  stop(): any {
    // PLACEHOLDER
  }
}