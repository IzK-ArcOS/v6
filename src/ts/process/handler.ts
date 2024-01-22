import { isDisabled } from "$ts/apps/disable/utils";
import { Log } from "$ts/console";
import { sleep } from "$ts/util";
import { Store } from "$ts/writable";
import { Nullable } from "$types/common";
import { LogLevel } from "$types/console";
import { ProcessKillResult, ProcessMap, ProcessSpawnArguments, ProcessSpawnResult, Processes } from "$types/process";
import { ProcessDispatcher } from "./dispatch";
import { Process } from "./instance";

const PROCESS_LIMIT = 150;

export class ProcessHandler {
  public processes: Processes = Store(new Map([]));
  public closedPids = Store<number[]>([]);
  public dispatch: ProcessDispatcher;

  constructor(public readonly id: string) {
    this.Log(`Created Process Handler for ${id}`);
    this.dispatch = new ProcessDispatcher(this)
  }

  private Log(text: string, level?: LogLevel) {
    Log("process/handler", `ProcessHandler[${this.id}]: ${text}`, level)
  }

  // ### SECTION SPAWN ###
  public async spawn({ proc, name, parentPid, app, args }: ProcessSpawnArguments): Promise<Process | ProcessSpawnResult> {
    this.Log(`Spawning process ${proc.name} (isApp = ${!!app})`);

    if (app && isDisabled(app.id)) {
      this.Log(`Not spawning disabled application ${app.id}!`, LogLevel.error)

      return "err_disabled";
    }

    const aboveLimit = this.checkProcessLimit(!!app);
    const procs = this.processes.get();
    const pid = Math.floor(Math.random() * 1e6); // 0 - 1000000

    if (aboveLimit) return "err_aboveLimit";

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
  public async kill(pid: number, elevated: boolean): Promise<ProcessKillResult> {
    this.Log(`Killing process with PID ${pid}`);

    const procs = this.processes.get();
    const proc = procs.get(pid);

    if (proc && proc._disposed) return "err_disposed"
    if (!procs.has(pid)) return "err_noExist";
    if (!elevated) return "err_elevation";
    if (proc._criticalProcess) return "err_criticalProcess";

    if (proc.stop) {
      const cancelStop = !(await proc.stop());

      if (cancelStop) return "err_killCancel";
    }

    await this._killSubProcesses(pid)
    await this._close(pid);
    this.dispatch.unsubscribe(pid)

    proc._disposed = true
    procs.set(pid, proc);

    this.processes.set(procs);

    return "success";
  }

  private async _killSubProcesses(pid: number) {
    const procs = this.getSubProcesses(pid);

    if (!procs.size) return;

    for (const [pid, proc] of procs) {
      if (proc._disposed) continue;

      this.kill(pid, true)
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
  public getProcess<T = Process>(pid: number): Nullable<T> {
    const procs = this.processes.get();

    if (!procs.has(pid)) return null;

    const proc = procs.get(pid);

    return proc._disposed ? null : proc as T;
  }

  public getSubProcesses(pPid: number): ProcessMap {
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
    const children = this.getSubProcesses(pPid);
    const result: ProcessMap = new Map([]);

    for (const [pid, proc] of children) {
      if (proc.parentPid != pPid || !proc.app || !proc.app.isOverlay) continue;

      result.set(pid, proc);
    }

    return result;
  }

  public getAppPids(id: string): number[] {
    const procs = this.processes.get();
    const result = [];

    for (const [pid, proc] of procs) {
      if (proc.app && proc.app.id == id && !this.isClosed(pid)) {
        result.push(pid)
      }
    }

    return result;
  }
  // ### END SECTION GETTERS ###

  // ### SECTION CHECKS ###
  public isPid(pid: number, opened = false): boolean {
    const procs = this.processes.get();
    const closed = this.closedPids.get();

    if (opened) return procs.has(pid) && !closed.includes(pid);

    return procs.has(pid) || closed.includes(pid);
  }

  public isClosed(pid: number): boolean {
    const closed = this.closedPids.get();

    return closed.includes(pid);
  }

  public checkProcessLimit(isApp?: boolean): boolean {
    const apps = [...this.processes.get()].filter((a) => !a[1]._disposed && a[1].app).length
    const above = apps >= PROCESS_LIMIT && isApp;

    if (above) this.Log(`WARNING: Running app count is above ${PROCESS_LIMIT}, not spawning additional apps!`, LogLevel.critical)

    return above;
  }
  // ### END SECTION CHECKS ###
}