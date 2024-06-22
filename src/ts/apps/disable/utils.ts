import { DisableBlacklist } from "$ts/stores/apps/blacklist";
import { UserDataStore } from "$ts/stores/user";

export function isDisabled(id: string) {
  const userdata = UserDataStore.get();

  return userdata.disabledApps.includes(id) && !DisableBlacklist.includes(id);
}
