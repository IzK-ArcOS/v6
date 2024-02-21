import { Log } from "$ts/console";
import { getServerUrl, makeTokenOptions } from "$ts/server/util";
import { Endpoints } from "$ts/stores/endpoint";
import { LogLevel } from "$types/console";
import axios from "axios";

export * from "./name";
export * from "./password";

export async function createUser(username: string, password: string): Promise<boolean> {
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
