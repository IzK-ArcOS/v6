import { Log } from "$ts/console";
import { ProcessStack } from "$ts/stores/process";
import { DefaultService } from "$ts/stores/service/default";
import { Nullable } from "$types/common";
import { Service, ServiceChangeResult, ServiceStore } from "$types/service";
import { ServiceManager, ServiceManagerPid } from ".";

export async function stopService(id: string, fromSystem = false): Promise<ServiceChangeResult> {
  Log("service/interact", `Attempting to stop ${id}`);

  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return "err_noManager";

  return await manager.stopService(id, fromSystem);
}

export async function startService(id: string, fromSystem = false): Promise<ServiceChangeResult> {
  Log("service/interact", `Attempting to start ${id}`);

  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return "err_noManager";

  return await manager.startService(id, fromSystem);
}

export async function restartService(id: string, fromSystem = false): Promise<ServiceChangeResult> {
  Log("service/interact", `Attempting to restart ${id}`);

  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return "err_noManager";

  return await manager.restartService(id, fromSystem);
}

export function getService(id: string): Nullable<Service> {
  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return DefaultService;

  const services = manager.Services.get();

  return services.has(id) ? services.get(id) : DefaultService;
}

export function getAllServices(): Nullable<ServiceStore> {
  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return null;

  const services = manager.Services.get();

  return services;
}

export function isServiceRunning(id: string): boolean {
  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return false;

  const services = manager.Services.get();

  return services.has(id) ? !!services.get(id).pid : false;
}

export async function startInitialServices() {
  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return;

  manager.initialRun();
}
