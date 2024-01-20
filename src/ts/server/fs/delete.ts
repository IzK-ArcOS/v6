import { toBase64 } from "$ts/base64";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { GlobalDispatch } from "$ts/process/dispatch/global";

export async function deleteItem(path: string): Promise<boolean> {
  const url = getServerUrl(Endpoints.FsRm, { path: toBase64(path) });
  const token = UserToken.get();

  if (!url || !token) return false;

  const response = await axios.get(url, makeTokenOptions(token));

  GlobalDispatch.dispatch("fs-flush");

  return response.status === 200;
}
