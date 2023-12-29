import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import { defaultQuota } from "$ts/stores/quota";
import { ConnectedServer } from "$ts/stores/server";
import { UserName, UserToken } from "$ts/stores/user";
import { FSQuota } from "$types/fs";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";

export async function getFSQuota(): Promise<FSQuota> {
  const username = UserName.get();
  const server = ConnectedServer.get();
  const token = UserToken.get();
  const url = getServerUrl(Endpoints.FsQuota);

  if (!server || !username || !url || !token) return defaultQuota;

  Log(`server/fs/quota`, `Getting FSQuota for ${username}`);

  const response = await axios.get(url, makeTokenOptions(token));

  if (response.status !== 200) return defaultQuota;

  return response.data.data as FSQuota;
}
