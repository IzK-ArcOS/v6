import { Cache } from "$ts/cache";
import { Store } from "$ts/writable";
import { AllUsers, UserData } from "$types/user";

export const UserName = Store<string>();
export const UserDataStore = Store<UserData>();
export const UserToken = Store<string>();
export const UserCache = new Cache<AllUsers>("UserCache", {});
