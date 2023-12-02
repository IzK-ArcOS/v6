import { Log } from "$ts/console";

export async function getMode() {
  Log("branding", "Attempting to retrieve mode from /mode");

  try {
    const mode = await (await fetch("./mode")).text();

    ARCOS_MODE = mode.trim();
  } catch {
    ARCOS_MODE = "release";
  }
}

export let ARCOS_MODE = "release";
