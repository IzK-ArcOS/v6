import { AppSpawnResult } from "$types/app";
import { ProcessSpawnResultCaptions } from "../process/captions";

export const AppSpawnResultCaptions: Record<AppSpawnResult, string> = {
  success: "Application spawned successfully.",
  err_elevation: "Elevation is required, and it wasn't provided.",
  err_noExist: "The Application doesn't exist.",
  err_spawnCondition: "The spawn condition failed.",
  err_parentNoExist: "The parent process doesn't exist.",
  ...ProcessSpawnResultCaptions,
};
