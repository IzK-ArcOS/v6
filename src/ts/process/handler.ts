import { Log } from "$ts/console";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import { App } from "$types/app";
import { Nullable } from "$types/common";
import { LogLevel } from "$types/console";
import { ProcessMap, ProcessSpawnArguments, Processes } from "$types/process";
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

  // ### SECTION SPAWN ###
  public async spawn({ proc, name, parentPid, app, args }: ProcessSpawnArguments) {
    this.Log(`Spawning process ${proc.name} (isApp = ${!!app})`);

    const procs = this.processes.get();

    const pid = Math.floor(Math.random() * 1e6); // 0 - 1000000

    if (procs.has(pid)) return await this.spawn({ proc, name, parentPid, app, args }) // Try to get another pid

    const instance = new proc(this, pid, name, app, args)

    if (parentPid) instance.setParentPid(parentPid);

    procs.set(pid, instance);

    this.processes.set(procs);

    await this.handleProcess(pid)

    return instance;
  }

  private async handleProcess(pid: number) {
    this.Log(`(internal) Handling process with PID ${pid} `)

    const procs = this.processes.get();

    if (!procs.has(pid)) return false;

    const proc = procs.get(pid);

    if (proc._disposed) return false;

    if (proc.start) proc.start()
  }
  // ### END SECTION SPAWN ###

  // ### SECTION KILL ###
  public async kill(pid: number): Promise<boolean> {
    this.Log(`Killing process with PID ${pid}`);

    const procs = this.processes.get();

    if (!procs.has(pid)) return false;

    const proc = procs.get(pid);

    if (proc._disposed) return false;

    if (proc.stop) await proc.stop();

    await this._killSubProcesses(pid)
    await this._close(pid);

    proc._disposed = true

    procs.set(pid, proc);

    this.processes.set(procs);

    return true;
  }

  private async _killSubProcesses(pid: number) {
    const procs = this.getSubProcesses(pid);

    if (!procs.size) return;

    for (const [pid] of procs) {
      await this.kill(pid)
    }
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
  // ### END SECTION KILL ###

  // ### SECTION GETTERS ###
  public getProcess(pid: number): Nullable<Process> {
    this.Log(`Getting process of PID ${pid}`)
    const procs = this.processes.get();

    if (!procs.has(pid)) return null;

    const proc = procs.get(pid);

    return proc._disposed ? null : proc;
  }

  public getSubProcesses(pPid: number): ProcessMap {
    this.Log(`Getting subprocesses of parent PID ${pPid}`);

    const result: ProcessMap = new Map([]);

    if (!this.isPid(pPid)) return result;

    const procs = this.processes.get();

    for (const [pid, proc] of procs) {
      if (proc.parentPid != pPid) continue;

      result.set(pid, proc);
    }

    return result;
  }

  public getOverlayProcesses(pPid: number): ProcessMap {
    this.Log(`Getting overlay subprocesses of parent PID ${pPid}`);

    const children = this.getSubProcesses(pPid);

    const result: ProcessMap = new Map([]);

    for (const [pid, proc] of children) {
      if (proc.parentPid != pPid || !proc.app || !proc.app.isOverlay) continue;

      result.set(pid, proc);
    }

    return result;
  }
  // ### END SECTION GETTERS ###

  // ### SECTION CHECKS ###
  public isPid(pid: number): boolean {
    const procs = this.processes.get();
    const closed = this.closedPids.get();

    return procs.has(pid) || closed.includes(pid);
  }

  public isClosed(pid: number): boolean {
    const closed = this.closedPids.get();

    return closed.includes(pid);
  }
  // ### END SECTION CHECKS ###
}