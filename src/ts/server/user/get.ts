import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import { UserCache } from "$ts/stores/user";
import { AllUsers, PartialUser } from "$types/user";
import axios from "axios";
import { getServerUrl } from "../util";

export async function getUsers(): Promise<AllUsers> {
  Log("server/user/get", "Getting users");

  const cache = UserCache.get();

  if (cache && Object.entries(cache).length) return cache;

  const url = getServerUrl(Endpoints.Users);

  if (!url) return {};

  const response = await axios.get(url);

  if (response.status !== 200) return {};

  const userList = response.data.data as PartialUser[]; // Don't ask.
  const allUsers = {};

  for (const user of userList) {
    allUsers[user.username] = user;
  }

  UserCache.set(allUsers);

  return allUsers as AllUsers;
}

export async function getUserList(): Promise<PartialUser[]> {
  const url = getServerUrl(Endpoints.Users);

  if (!url) return [];

  const response = await axios.get(url);

  if (response.status !== 200) return [];

  const userList = response.data.data as PartialUser[]; // Don't ask.

  return userList
}