import { Log } from "$ts/console";
import { ReleaseLogo } from "$ts/images/branding";
import { MODES } from "$ts/stores/branding";
import { LogLevel } from "$types/console";

export let ARCOS_MODE = "release";

export async function getMode() {
  Log(
    "ts/branding: getMode",
    "Attempting to retrieve mode from /mode",
    LogLevel.info
  );

  try {
    const mode = await (await fetch("./mode")).text();

    ARCOS_MODE = mode.trim();
  } catch {
    ARCOS_MODE = "release";
  }
}

export const Logo = (m?: string) => MODES[m || ARCOS_MODE] || ReleaseLogo;
