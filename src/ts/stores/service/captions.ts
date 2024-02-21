import { ServiceChangeResult } from "$types/service";

export const ServiceChangeResultCaptions: Record<ServiceChangeResult, string> = {
  err_alreadyRunning: "The service is already running.",
  err_noExist: "The service could not be found.",
  err_notRunning: "The service isn't running",
  err_spawnFailed: "The process of the service could not be started.",
  err_startCondition: "The Start Condition of the service failed.",
  err_noManager: "Could not reach Service Manager",
  err_elevation: "Elevation is necessary, but wasn't provided.",
  success: "Service started successfully.",
};
