import { ErrorIcon } from "$ts/images/dialog";
import { ShutdownIcon } from "$ts/images/power";
import { sendNotification } from "$ts/notif";
import { createErrorDialog } from "../error";

export function CoreRestartNotification(count: number) {
  sendNotification({
    title: "Processes restarted",
    message: `ArcOS has restarted ${count} core process${count == 1 ? "" : "es"} that weren't running anymore. Do note that ArcOS might show behave unexpectedly until you restart. Click Learn More for more information.`,
    image: ShutdownIcon,
    timeout: 2500,
    buttons: [{
      caption: "Learn More",
      action: moreInfo
    }]
  });

  function moreInfo() {
    createErrorDialog({
      title: "Processes restarted",
      message: "When restarting core services, certain components such as the Action Center and System Tray might behave unexpectedly because of misfiring intervals. ArcOS could behave normally, or it could not, completely depending on when and how the processes were stopped. To ensure that ArcOS remains stable, it is advised to restart.",
      buttons: [
        {
          caption: "Ignore", action() { },
        },
        {
          caption: "Restart Now", action() {
            throw new Error("Not Implemented: Restarting from desktop");
          },
          suggested: true
        }
      ],
      image: ErrorIcon
    }, 0)
  }
}