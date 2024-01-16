import { spawnApp } from "$ts/apps";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { ProcessStack } from "$ts/stores/process";
import { ElevationData } from "$types/elevation";

export async function GetUserElevation(data: ElevationData) {
  const id = Math.floor(Math.random() * 1e6);
  const shellPid = ProcessStack.getAppPids("ArcShell")[0];

  if (!shellPid) return false; // No shell so can't permit

  const pid = await spawnApp("Elevation", shellPid, [id, data]);

  if (!pid) return false; // No Elevation process, so can't permit

  return new Promise((resolve) => {
    GlobalDispatch.subscribe("elevation-accept", (data) => {
      if (data[0] && data[0] === id) resolve(true);
    });

    GlobalDispatch.subscribe("elevation-reject", (data) => {
      if (data[0] && data[0] === id) resolve(false);
    });
  });
}