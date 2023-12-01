import { Cache } from "$ts/cache";
import { Store } from "$ts/writable";
import { AllUsers } from "$types/user";

export const UserName = Store<string>();
export const UserDataStore = Store<any>();
export const UserToken = Store<string>();
export const UserCache = new Cache<AllUsers>("UserCache", {});
