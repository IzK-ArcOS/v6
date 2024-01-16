import { getAppById, spawnApp, spawnOverlay } from "$ts/apps";
import { Process } from "$ts/process";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { ProcessStack } from "$ts/stores/process";
import { ElevationData } from "$types/elevation";

export async function GetUserElevation(data: ElevationData): Promise<boolean> {
  const id = Math.floor(Math.random() * 1e6);
  const shellPid = ProcessStack.getAppPids("ArcShell")[0];

  const app = getAppById("SecureContext");

  if (!app) return false // No secure context!

  let proc: number | Process | false;

  if (!shellPid) {
    proc = await spawnApp("SecureContext", 0, [id, data])
  } else {
    proc = await spawnOverlay(app, shellPid || 0, [id, data]);
  }

  if (!proc) return false; // No Elevation process, so can't permit

  return new Promise((resolve) => {
    GlobalDispatch.subscribe("elevation-accept", (data) => {
      if (data[0] && data[0] === id) resolve(true);
    });

    GlobalDispatch.subscribe("elevation-reject", (data) => {
      if (data[0] && data[0] === id) resolve(false);
    });
  });
}