import { AllUsers } from "$types/user";
import axios from "axios";
import { getServerUrl } from "../util";
import { UserCache } from "$ts/stores/user";

export async function getUsers(): Promise<AllUsers> {
  const cache = UserCache.get();

  if (cache && Object.entries(cache).length) return cache;

  const url = getServerUrl("/v2/users");

  if (!url) return {};

  const response = await axios.get(url);

  if (response.status !== 200) return {};

  UserCache.set(response.data);

  return response.data as AllUsers;
}
