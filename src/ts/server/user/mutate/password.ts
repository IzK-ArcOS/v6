import { toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { getServerUrl } from "$ts/server/util";
import { Endpoints } from "$ts/stores/endpoint";
import axios from "axios";
import { setRememberedToken } from "../auth";

export async function changePassword(
  username: string,
  oldPassword: string,
  newPassword: string,
  confirm: string
) {
  Log("server/user/mutate/password", `Changing password for user ${username}`);

  const newBase64 = toBase64(newPassword);

  if (newBase64 == newPassword) return false;

  const url = getServerUrl(Endpoints.UserChangePassword, { new: newBase64 });

  if (newPassword != confirm || !url) return false;

  const token = toBase64(`${username}:${oldPassword}`);

  try {
    const response = await axios.get(url, { headers: { Authorization: `Basic ${token}` } });

    if (response.status !== 200) return false;

    setRememberedToken(username, newPassword);

    return true;
  } catch {
    return false;
  }
}
