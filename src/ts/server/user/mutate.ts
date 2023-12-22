import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { fromBase64, toBase64 } from "$ts/base64";
import { UserName, UserToken } from "$ts/stores/user";
import { setRememberedToken } from "./auth";
import { LogLevel } from "$types/console";

export async function createUser(
  username: string,
  password: string
): Promise<boolean> {
  Log("server/user/mutate", `Creating user "${username}"`);

  const url = getServerUrl(Endpoints.NewUsers);

  if (!url) return false;

  try {
    const req = await axios.post(url, { username, password });

    return req.status === 200;
  } catch {
    return false;
  }
}

export async function deleteSelf(token: string): Promise<boolean> {
  Log("server/user/mutate", `Goodbye cruel world, I'm deleting my own account...`, LogLevel.warn);

  const url = getServerUrl(Endpoints.UserData);

  if (!url) return false;

  try {
    const response = await axios.delete(url, makeTokenOptions(token));

    return response.status === 200;
  } catch {
    return false;
  }
}

export async function changeUsername(oldName: string, newName: string) {
  Log("server/user/mutate", `Changing username from ${oldName} to ${newName}`);

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