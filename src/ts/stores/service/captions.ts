import { ServiceStartResult } from "$types/service";

export const ServiceStartResultCaptions: Record<ServiceStartResult, string> = {
  "err_alreadyRunning": "The service is already running.",
  "err_noExist": "The service could not be found.",
  "err_spawnFailed": "The process of the service could not be started.",
  "err_startCondition": "The Start Condition of the service failed.",
  "err_noManager": "Could not reach Service Manager",
  "err_elevation": "Elevation is necessary, and wasn't provided.",
  "started": "Service started successfully."
}