import { ProfilePictures, getProfilePicture } from "$ts/stores/pfp";
import { ConnectedServer } from "$ts/stores/server";
import { Params } from "$types/server";
import { getUsers } from "./get";

const pfpCache: Params = {};

export async function getUserPfp(username: string): Promise<string> {
  const server = ConnectedServer.get();

  if (!server) return ProfilePictures.def;

  if (pfpCache[username]) return getProfilePicture(pfpCache[username]);

  const users = await getUsers();

  const user = users[username];

  if (!user) return ProfilePictures.def;

  pfpCache[username] = getProfilePicture(users[username].acc.profilePicture);

  return pfpCache[username];
}
