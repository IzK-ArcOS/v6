import { SecurityHighIcon } from "$ts/images/general";
import { sendNotification } from "$ts/notif";
import { ProcessHandler } from "$ts/process";
import { ES, ElevationPid } from "$ts/services/sc";
import { ElevationData } from "$types/elevation";

export async function GetUserElevation(data: ElevationData, stack: ProcessHandler): Promise<boolean> {
  const elevation = ElevationPid.get();
  const manager = stack.getProcess<ES>(elevation);

  if (!elevation || !manager) {
    sendNotification({
      title: "Elevation failed",
      message: "The Elevation Service isn't running anymore. Without it, you can't access the ArcOS Secure Context. Please restart to resolve this problem.",
      image: SecurityHighIcon
    })

    return false;
  }

  return await manager.GetUserElevation(data);
}