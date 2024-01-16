import { GetUserElevation } from "$ts/elevation";
import { Process, ProcessHandler } from "$ts/process";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { ElevationChangeServiceState } from "$ts/stores/elevation";
import { ProcessStack } from "$ts/stores/process";
import { serviceStore } from "$ts/stores/service";
import { Store } from "$ts/writable";
import { App } from "$types/app";
import { LogLevel } from "$types/console";
import { ReadableServiceStore, ServiceStartResult, ServiceStore } from "$types/service";

export const ServiceManagerPid = Store<number>();

export class ServiceManager extends Process {
  public Services: ReadableServiceStore = Store<ServiceStore>();
  public _criticalProcess: boolean = true; // Make sure the user can't end this one
  private _storeLoaded = false;
  private _holdRestart = false;

  constructor(handler: ProcessHandler, pid: number, name: string, app: App, args: any[]) {
    super(handler, pid, name, app, args);
  }

  public start() {
    ServiceManagerPid.set(this.pid);

    this.init();
  }

  public loadStore(store: ServiceStore) {
    if (this._storeLoaded) {
      this.Log(`Can't load another store: a store is already loaded.`, LogLevel.error);

      return false;
    }

    this.Log(`Loading store (${store.size} services)`);

    for (const [id, service] of [...store]) {
      service.id = id;
      service.loadedAt = new Date().getTime();

      store.set(id, service);
    }

    this.Services.set(store);

    return this._storeLoaded = true;
  }

  public async startService(id: string, fromSystem = false): Promise<ServiceStartResult> {
    const services = this.Services.get();
    const service = services.get(id);

    if (!services.has(id)) return "err_noExist";

    const elevation = fromSystem || await GetUserElevation(ElevationChangeServiceState(service));

    if (!elevation) return "err_elevation";

    const canStart = service.startCondition ? await service.startCondition() : true;

    if (!canStart) return "err_startCondition";

    const instance = await ProcessStack.spawn({ proc: service.process, name: `svc#${id}`, parentPid: this.pid });

    if (!instance) return "err_spawnFailed";

    service.pid = instance.pid;
    service.changedAt = new Date().getTime();

    services.set(id, service);
    this.Services.set(services);

    return "started";
  }

  public async stopService(id: string, fromSystem = false): Promise<boolean> {
    this.Log(`Stopping ${id}`);

    const services = this.Services.get();
    const service = services.get(id);

    if (!services.has(id) || !service.pid) return false;

    const elevation = fromSystem || await GetUserElevation(ElevationChangeServiceState(service));

    if (!elevation) return false;

    this._holdRestart = true

    await ProcessStack.kill(service.pid);

    service.pid = null;
    service.changedAt = new Date().getTime();

    services.set(id, service);
    this.Services.set(services);

    this._holdRestart = false;

    return true;
  }

  public async restartService(id: string, fromSystem = false): Promise<ServiceStartResult> {
    const services = this.Services.get();

    if (!services.has(id)) return "err_noExist";

    const elevation = fromSystem || await GetUserElevation(ElevationChangeServiceState(services.get(id)));

    if (!elevation) return "err_elevation";

    const stopped = await this.stopService(id, true);
    const started = await this.startService(id, true);

    return started;
  }

  private initialRun() {
    const services = this.Services.get();

    for (const [id, service] of [...services]) {
      if (!service.initialState || service.initialState != "started") continue;

      this.startService(id, true);
    }
  }

  private init() {
    this.loadStore(serviceStore);
    this.initialRun();

    ProcessStack.processes.subscribe(() => this.verifyServicesProcesses());

    this.Services.subscribe(() => GlobalDispatch.dispatch("services-flush"))
  }

  public async verifyServicesProcesses() {
    if (this.pauseCheck() || this._holdRestart) return;

    const services = this.Services.get();

    for (const [id, service] of [...services]) {
      if (!service.pid || ProcessStack.isPid(service.pid, true)) continue;

      this.Log(`Process of ${id} doesn't exist anymore! Restarting service...`, LogLevel.warn)

      await this.restartService(id, true)
    }
  }
}