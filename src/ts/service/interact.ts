import { Log } from "$ts/console";
import { ProcessStack } from "$ts/stores/process";
import { Nullable } from "$types/common";
import { Service, ServiceStartResult, ServiceStore } from "$types/service";
import { ServiceManager, ServiceManagerPid } from ".";

export async function stopService(id: string) {
  Log("service/interact", `Attempting to stop ${id}`);

  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return false;

  return await manager.stopService(id);
}

export async function startService(id: string): Promise<ServiceStartResult> {
  Log("service/interact", `Attempting to start ${id}`);

  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return "err_noManager";

  return await manager.startService(id);
}

export async function restartService(id: string) {
  Log("service/interact", `Attempting to restart ${id}`);

  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return false;

  return await manager.restartService(id);
}

export function getService(id: string): Nullable<Service> {
  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return null;

  const services = manager.Services.get();

  return services.has(id) ? services.get(id) : null
}

export function getAllServices(): Nullable<ServiceStore> {
  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return null;

  const services = manager.Services.get();

  return services
}

export function isServiceRunning(id: string): boolean {
  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return false;

  const services = manager.Services.get();

  return services.has(id) ? !!services.get(id).pid : false
}