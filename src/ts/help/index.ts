import { ArticlePath } from "$apps/HelpSupport/ts/types";
import { spawnApp } from "$ts/apps";
import { focusedPid } from "$ts/stores/apps";
import { ProcessStack } from "$ts/stores/process";

export async function GetHelp(article: string | ArticlePath) {
  const helpPid = ProcessStack.getAppPids("HelpSupport")[0];

  if (!helpPid) {
    await spawnApp("HelpSupport", 0, [article]);
    return;
  }

  ProcessStack.dispatch.dispatchToPid(helpPid, "change-article", article);
  focusedPid.set(helpPid);
}

