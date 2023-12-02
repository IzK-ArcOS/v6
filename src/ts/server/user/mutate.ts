import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";

export async function createUser(
  username: string,
  password: string
): Promise<boolean> {
  Log("server/user/mutate", `Creating user "${username}"`);

  const url = getServerUrl(Endpoints.NewUsers);

  if (!url) return false;

  const req = await axios.post(url, { username, password });

  return req.status === 200;
}

export async function deleteSelf(token: string): Promise<boolean> {
  const url = getServerUrl(Endpoints.UserData);

  if (!url) return false;

  const response = await axios.delete(url, makeTokenOptions(token));

  return response.status === 200;
}
