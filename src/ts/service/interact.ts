import { ProcessStack } from "$ts/stores/process";
import { Nullable } from "$types/common";
import { Service } from "$types/service";
import { ServiceManager, ServiceManagerPid } from ".";

export async function stopService(id: string) {
  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return false;

  return await manager.stopService(id);
}

export async function startService(id: string) {
  const managerPid = ServiceManagerPid.get();
  const manager = ProcessStack.getProcess<ServiceManager>(managerPid);

  if (!managerPid || !manager) return false;

  return await manager.startService(id);
}

export async function restartService(id: string) {
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