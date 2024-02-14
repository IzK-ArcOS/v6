import { ProfilePictures, getProfilePicture } from "$ts/stores/pfp";
import { ConnectedServer } from "$ts/stores/server";
import { Params } from "$types/server";
import { AllUsers } from "$types/user";
import { getUsers } from "./get";

const pfpCache: Params = {};

export async function getUserPfp(username: string, fallback = "", store?: AllUsers): Promise<string> {
  const server = ConnectedServer.get();

  if (!server) return fallback || ProfilePictures.def;

  if (pfpCache[username]) return getProfilePicture(pfpCache[username]);

  const users = store || (await getUsers());

  const user = users[username];

  if (!user) return fallback || ProfilePictures.def;

  pfpCache[username] = getProfilePicture(users[username].acc.profilePicture);

  return pfpCache[username];
}
