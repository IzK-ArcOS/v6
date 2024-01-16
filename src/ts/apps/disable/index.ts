import { GetUserElevation } from "$ts/elevation";
import { ChangeDisabledStateData } from "$ts/stores/elevation";
import { UserDataStore } from "$ts/stores/user";

export async function disableApp(id: string) {
  const userdata = UserDataStore.get();

  if (userdata.disabledApps.includes(id)) return false;

  const elevated = await GetUserElevation(ChangeDisabledStateData(id));

  if (!elevated) return false;

  userdata.disabledApps.push(id);
  UserDataStore.set(userdata);

  return true;
}

export async function enableApp(id: string) {
  const userdata = UserDataStore.get();
  const index = userdata.disabledApps.indexOf(id);

  if (!userdata.disabledApps.includes(id)) return false;

  const elevated = await GetUserElevation(ChangeDisabledStateData(id));

  if (!elevated) return false;

  userdata.disabledApps.splice(index, 1);
  UserDataStore.set(userdata);

  return true;
}
