import { UserDataStore } from "$ts/stores/user";

export function isDisabled(id: string) {
  const userdata = UserDataStore.get();

  return userdata.disabledApps.includes(id);
}
