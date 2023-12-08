import { toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { UserDirectory } from "$types/fs";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";

export async function readDirectory(path: string): Promise<UserDirectory> {
  const url = getServerUrl(Endpoints.FsDirectory, { path: toBase64(path) });
  const token = UserToken.get();

  if (!url || !token) return null;

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    if (response.status !== 200) return null;

    //!! THIS CODE IS NOT AT ALL DEFINITIVE OR WORKING
    return response.data.data as UserDirectory;
  } catch {
    return null;
  }
}

export async function createDirectory(path: string): Promise<boolean> {
  const url = getServerUrl("/fs/dir/create", { path: toBase64(path) });
  const token = UserToken.get();

  if (!url || !token) return false;

  const response = await axios.get(url, makeTokenOptions(token));

  return response.status === 200;
}

export function getParentDirectory(p: string): string {
  Log("server/fs/dir", `Getting parent directory of ${p}`);

  const split = p.split("/");

  if (p == "./") return p;
  if (!split.length) return p;
  if (split.length == 1) return "./";

  split.splice(-1);

  const newPath = split.join("/");

  return newPath;
}
