import { AcceleratorHandler } from "$ts/apps/keyboard";
import { Log } from "$ts/console";
import { App } from "$types/app";
import { Nullable } from "$types/common";
import { LogLevel } from "$types/console";
import { ProcessHandler } from "./handler";

export class Process {
  public _disposed = false;
  public _paused = false;
  public _pausedError = "Not executing code in paused process";
  public _criticalProcess = false;
  public app: Nullable<App> = null;
  public parentPid: Nullable<number> = null;
  public args: any[] = [];
  public accelerator: AcceleratorHandler;

  constructor(
    public readonly handler: ProcessHandler,
    public pid: number,
    public name: string,
    app?: App,
    args: any[] = []
  ) {
    this.app = app;
    this.args = args;

    if (this.app) {
      this.accelerator = new AcceleratorHandler(this);
    }
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

  protected pauseCheck() {
    if (this._disposed) return true;

    if (this._paused) this.Log(this._pausedError, LogLevel.error);

    return this._paused;
  }

  protected pause() {
    this.Log(`Pausing ${this.pid}`);

    if (this._paused) {
      this.Log(`Attempted to pause already paused process`, LogLevel.warn);

      return;
    }

    this._paused = true;
  }

  protected resume() {
    this.Log(`Resuming ${this.pid}`)

    if (!this._paused) {
      this.Log(`Attempted to resume unpaused process`, LogLevel.warn);

      return;
    }

    this._paused = false;
  }

  public hasIdAsSubprocess(id: string): boolean {
    const subprocesses = [...this.handler.getSubProcesses(this.pid)];

    for (const [_, process] of subprocesses) {

      if (process._disposed) continue;
      if (process.app && process.app.id == id) return true;
    }

    return false;
  }
}
