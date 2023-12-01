import { Log } from "$ts/console";
import { UserToken } from "$ts/stores/user";
import { UserDataResponse } from "$types/response";
import { UserData } from "$types/user";
import { getServerUrl, makeTokenOptions } from "../util";
import axios from "axios";

export async function getUserData(token?: string): Promise<UserData> {
  Log("server/user/data", "Getting UserData using <token>");

  const bearer = token || UserToken.get();
  const url = getServerUrl("/v2/users/me");

  if (!token || !url) return;

  const response = await axios.get<UserDataResponse>(
    url,
    makeTokenOptions(bearer)
  );

  if (response.status !== 200) return null;

  return response.data.properties;
}
