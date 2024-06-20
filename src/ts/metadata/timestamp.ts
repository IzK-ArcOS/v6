import { Log } from "$ts/console";
import { tryParseInt } from "$ts/int";

export let BUILD_TIMESTAMP = 0;

export async function getBuildTimestamp() {
  Log("branding/build", "Attempting to retrieve git hash from /build");

  try {
    const req = await (await fetch("./timestamp")).text();
    const str = req.split("\n")[0].trim();

    BUILD_TIMESTAMP = tryParseInt(str);
  } catch {
    BUILD_TIMESTAMP = new Date().getTime();
  }
}
