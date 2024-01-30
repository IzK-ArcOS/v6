import { GlobeIcon } from "./images/general";
import { createErrorDialog } from "./process/error";
import { PrimaryState } from "./states";
import { ProcessStack } from "./stores/process";

const observer = new MutationObserver(mutationCallback);
const registered = [];

function attachDisableAnchorRedirection() {
  const anchors = document.querySelectorAll("a");

  for (let i = 0; i < anchors.length; i++) {
    if (registered.includes(anchors[i])) continue;

    registered.push(anchors[i]);

    anchors[i].addEventListener("click", (e) => {
      const currentState = PrimaryState.current.get().key;

      e.preventDefault();

      if (currentState !== "desktop") return;

      const shellPid = ProcessStack.getAppPids("ArcShell")[0]

      createErrorDialog({
        title: "Open this page?",
        message: `You're about to leave ArcOS to navigate to <code>${anchors[i].href}</code> in a <b>new tab</b>. Are you sure you want to continue?`,
        buttons: [
          {
            caption: "Stay here",
            action() { },
          },
          {
            caption: "Proceed",
            action() {
              window.open(anchors[i].href, "_blank")
            },
            suggested: true
          },
        ],
        image: GlobeIcon
      }, shellPid || 0, !!shellPid);
    });
  }
}

function mutationCallback(mutationsList: MutationRecord[]) {
  for (let i = 0; i < mutationsList.length; i++) {
    const mutation = mutationsList[i];

    if (mutation.type !== "childList") continue;

    attachDisableAnchorRedirection();
  }
}

export function preventAnchorRedirects() {
  observer.observe(document.body, { childList: true, subtree: true });
}
