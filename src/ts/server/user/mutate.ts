import { Log } from "$ts/console";
import { makeTokenOptions, getServerUrl } from "../util";
import axios from "axios";

export async function createUser(
  username: string,
  password: string
): Promise<boolean> {
  Log("server/user/mutate", `Creating user "${username}"`);

  const url = getServerUrl("/v2/users");

  if (!url) return false;

  const req = await axios.post(url, { username, password });

  return req.status === 200;
}

export async function deleteSelf(token: string): Promise<boolean> {
  const url = getServerUrl("/v2/users/me");

  if (!url) return false;

  const response = await axios.delete(url, makeTokenOptions(token));

  return response.status === 200;
}
