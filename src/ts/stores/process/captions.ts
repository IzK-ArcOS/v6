import { ProcessKillResult, ProcessSpawnResult } from "$types/process";

export const ProcessSpawnResultCaptions: Record<ProcessSpawnResult, string> = {
  "err_aboveLimit": "The maximum amount of processes is reached",
  "err_disabled": "The Application is disabled",
  "success": "The process spawned successfully"
}
export const ProcessKillResultCaptions: Record<ProcessKillResult, string> = {
  "err_criticalProcess": "The process is required for ArcOS to run properly.",
  "err_disposed": "The process is already killed.",
  "err_elevation": "Elevation was required, but wasn't provided.",
  "err_noExist": "The process doesn't exist.",
  "success": "The process was killed successfully."
}