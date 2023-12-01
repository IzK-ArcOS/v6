import { getAuthcode } from "$ts/server/authcode";
import { getServer } from "$ts/server/multi";

export function removeApiSensitive(str: string): string {
  const api = getServer();
  const ac = getAuthcode(api);

  str = str.replaceAll(api, "<api>");

  if (ac && ac.length) str = str.replaceAll(ac, "<ac>");

  return str;
}
