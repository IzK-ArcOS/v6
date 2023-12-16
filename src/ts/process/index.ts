import { Log } from "$ts/console";
import { Store } from "$ts/writable";
import { Nullable } from "$types/common";
import { LogLevel } from "$types/console";
import { Process, Processes } from "$types/process";

export class ProcessHandler {
  public processes: Processes = Store(new Map([]));
  public closedPids = Store<number[]>([]);

  constructor(public readonly id: string) {
    this.Log(`Created Process Handler for ${id}`);
  }

  private Log(text: string, level?: LogLevel) {
    Log("process", `ProcessHandler[${this.id}]: ${text}`, level)
  }

  public async spawn(proc: Process) {
    this.Log(`Spawning process ${proc.name} (isApp = ${!!proc.app})`);

    const procs = this.processes.get();

    const pid = Math.floor(Math.random() * 1e6); // 0 - 1000000

    if (procs.has(pid)) return this.spawn(proc) // Try to get another pid

    procs.set(pid, Object.create(proc));

    this.processes.set(procs);

    await this.handleProcess(pid)

    return pid;
  }

  public async kill(pid: number): Promise<boolean> {
    this.Log(`Killing process with PID ${pid}`);

    const procs = this.processes.get();

    if (!procs.has(pid)) return false;

    const proc = procs.get(pid);

    if (proc == "disposed") return false;

    if (proc.stop) await proc.stop(proc, pid, this);

    this._close(pid);

    procs.set(pid, "disposed");

    this.processes.set(procs);
  }

  public getProcess(pid: number): Nullable<Process> {
    this.Log(`Getting process of PID ${pid}`)
    const procs = this.processes.get();

    if (!procs.has(pid)) return null;

    const proc = procs.get(pid);

    return proc == "disposed" ? null : proc;
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

  private _close(pid: number) {
    this.Log(`(internal) Closing process with PID ${pid} `)

    this.closedPids.update((v) => {
      if (v.includes(pid)) return v; // avoid duplicates

      v.push(pid);

      return v;
    })
  }

  private async handleProcess(pid: number) {
    this.Log(`(internal) Handling process with PID ${pid} `)

    const procs = this.processes.get();

    if (!procs.has(pid)) return false;

    const proc = procs.get(pid);

    if (proc == "disposed") return false;

    if (proc.start) proc.start(proc, pid, this)
  }
}