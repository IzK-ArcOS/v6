import { fromBase64, toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { getServerUrl, makeTokenOptions } from "$ts/server/util";
import { Endpoints } from "$ts/stores/endpoint";
import { UserName, UserToken } from "$ts/stores/user";
import axios from "axios";
import { setRememberedToken } from "../auth";

export async function changeUsername(oldName: string, newName: string) {
  Log("server/user/mutate/name", `Changing username from ${oldName} to ${newName}`);

  const url = getServerUrl(Endpoints.UserRename, { newname: toBase64(newName) });
  const token = UserToken.get();

  if (!url || !token) return false;

  try {
    const response = await axios.get(url, makeTokenOptions(token));
    const remembered = localStorage.getItem("arcos-remembered-token");

    if (!remembered) return response.status === 200;

    const password = fromBase64(remembered).split(":")[1];

    setRememberedToken(newName, password);
    UserName.set(newName)

    return response.status === 200;
  } catch {
    return false;
  }
}