import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";

export async function LogoffToken() {
  Log("server/user/logoff", "Logging off User Token...");

  const url = getServerUrl(Endpoints.LogoffToken);
  const token = UserToken.get();

  if (!url || !token) return false;

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    if (response.status !== 200) return false;

    UserToken.set(null);

    return true;
  } catch {
    return true;
  }
}
