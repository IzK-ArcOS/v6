import { Log } from "$ts/console";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import { App } from "$types/app";
import { Nullable } from "$types/common";
import { LogLevel } from "$types/console";
import { Processes } from "$types/process";
import { Process } from "./instance";

export class ProcessHandler {
  public processes: Processes = Store(new Map([]));
  public closedPids = Store<number[]>([]);

  constructor(public readonly id: string) {
    this.Log(`Created Process Handler for ${id}`);
  }

  private Log(text: string, level?: LogLevel) {
    Log("process/handler", `ProcessHandler[${this.id}]: ${text}`, level)
  }

  public async spawn(proc: typeof Process, name: string, app?: App) {
    this.Log(`Spawning process ${proc.name} (isApp = ${!!app})`);

    const procs = this.processes.get();

    const pid = Math.floor(Math.random() * 1e6); // 0 - 1000000

    if (procs.has(pid)) return this.spawn(proc, name, app) // Try to get another pid

    const instance = new proc(this, pid, name, app)

    procs.set(pid, instance);

    this.processes.set(procs);

    await this.handleProcess(pid)

    return pid;
  }

  public async kill(pid: number): Promise<boolean> {
    this.Log(`Killing process with PID ${pid}`);

    const procs = this.processes.get();

    if (!procs.has(pid)) return false;

    const proc = procs.get(pid);

    if (proc._disposed) return false;

    if (proc.stop) await proc.stop();

    await this._close(pid);

    proc._disposed = true

    procs.set(pid, proc);

    this.processes.set(procs);

    return true;
  }

  public getProcess(pid: number): Nullable<Process> {
    this.Log(`Getting process of PID ${pid}`)
    const procs = this.processes.get();

    if (!procs.has(pid)) return null;

    const proc = procs.get(pid);

    return proc._disposed ? null : proc;
  }

  public isPid(pid: number): boolean {
    const procs = this.processes.get();
    const closed = this.closedPids.get();

    return procs.has(pid) || closed.includes(pid);
  }

  public isClosed(pid: number): boolean {
    const closed = this.closedPids.get();

    return closed.includes(pid);
  }

  private async _close(pid: number) {
    this.Log(`(internal) Closing process with PID ${pid} `)

    const proc = this.getProcess(pid);

    if (!proc) return false;

    this.closedPids.update((v) => {
      if (v.includes(pid)) return v; // avoid duplicates

      v.push(pid);

      return v;
    });

    await sleep(proc.app ? 300 : 0);

    return true;
  }

  private async handleProcess(pid: number) {
    this.Log(`(internal) Handling process with PID ${pid} `)

    const procs = this.processes.get();

    if (!procs.has(pid)) return false;

    const proc = procs.get(pid);

    if (proc._disposed) return false;

    if (proc.start) proc.start()
  }
}