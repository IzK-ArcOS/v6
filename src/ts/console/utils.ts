import { LOG_BANS } from "$ts/stores/logging";

export function checkLogString(str: string): boolean {
  for (let i = 0; i < LOG_BANS.length; i++) {
    if (str.includes(LOG_BANS[i])) return false;
  }

  return true;
}
