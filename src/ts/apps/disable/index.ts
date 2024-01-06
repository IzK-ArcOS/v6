import { killAllAppInstances } from "$ts/process/kill";
import { UserDataStore } from "$ts/stores/user";

export async function disableApp(id: string) {
  const userdata = UserDataStore.get();

  if (userdata.disabledApps.includes(id)) return false;

  await killAllAppInstances(id);

  userdata.disabledApps.push(id);
  UserDataStore.set(userdata);

  return true;
}

export function enableApp(id: string) {
  const userdata = UserDataStore.get();
  const index = userdata.disabledApps.indexOf(id);

  if (!userdata.disabledApps.includes(id)) return false;

  userdata.disabledApps.splice(index, 1);
  UserDataStore.set(userdata);

  return true;
}
