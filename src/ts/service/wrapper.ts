import { WarningIcon } from "$ts/images/dialog";
import { sendNotification } from "$ts/notif";
import { ServiceChangeResultCaptions } from "$ts/stores/service/captions";
import { ServiceChangeResult } from "$types/service";
import { startService, stopService } from "./interact";

export async function stopServiceNotified(id: string): Promise<ServiceChangeResult> {
  const status = await stopService(id);

  if (status !== "success") {
    const caption = ServiceChangeResultCaptions[status];

    sendNotification({
      title: "Service Stop Failed",
      message: `ArcOS failed to stop ${id}: ${caption}<br/><br/>Error Code: ${status}`,
      image: WarningIcon,
    });
  }

  return status;
}

export async function startServiceNotified(id: string): Promise<ServiceChangeResult> {
  const status = await startService(id);

  if (status !== "success") {
    const caption = ServiceChangeResultCaptions[status];

    sendNotification({
      title: "Service Start Failed",
      message: `ArcOS failed to start ${id}: ${caption}<br/><br/>Error Code: ${status}`,
      image: WarningIcon,
    });
  }

  return status;
}
