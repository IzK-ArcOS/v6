import { LOG_BANS } from "$ts/stores/logging";

export function checkLogString(str: string): boolean {
  for (const item of LOG_BANS) {
    if (str.includes(item)) return false;
  }

  return true;
}
