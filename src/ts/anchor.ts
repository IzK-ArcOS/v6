import { GlobeIcon } from "./images/general";
import { createErrorDialog } from "./process/error";
import { PrimaryState } from "./states";
import { ProcessStack } from "./stores/process";

const observer = new MutationObserver(mutationCallback);
const registered = [];

function attachDisableAnchorRedirection() {
  const anchors = document.querySelectorAll("a");

  for (const anchor of anchors) {
    const href = anchor.getAttribute("href");

    if (registered.includes(anchor) || href.startsWith("@client/")) continue;

    registered.push(anchor);

    anchor.addEventListener("click", (e) => {
      const currentState = PrimaryState.current.get().key;

      e.preventDefault();

      if (currentState !== "desktop") return;

      const shellPid = ProcessStack.getAppPids("ArcShell")[0];

      createErrorDialog(
        {
          title: "Open this page?",
          message: `You're about to leave ArcOS to navigate to <code>${anchor.href}</code> in a <b>new tab</b>. Are you sure you want to continue?`,
          buttons: [
            {
              caption: "Stay here",
              action() {},
            },
            {
              caption: "Proceed",
              action() {
                window.open(anchor.href, "_blank");
              },
              suggested: true,
            },
          ],
          image: GlobeIcon,
        },
        shellPid || 0,
        !!shellPid
      );
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
