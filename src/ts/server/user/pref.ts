import { Log } from "$ts/console";
import { UserDataStore } from "$ts/stores/user";
export function getAppPreference(id: string, key: string): string | number | boolean | object {
  const udata = UserDataStore.get();

  if (!udata.appdata || !udata.appdata[id]) return undefined;

  return udata.appdata[id][key];
}

export function setAppPreference(
  id: string,
  key: string,
  value: string | number | boolean | object
): boolean {
  Log("server/user/pref", `Setting ${key} in ${id} to type ${typeof value}...`);

  UserDataStore.update((udata) => {
    if (!udata.appdata) return udata;

    if (!udata.appdata[id]) udata.appdata[id] = {};

    udata.appdata[id][key] = value;

    return udata;
  });

  return true;
}
