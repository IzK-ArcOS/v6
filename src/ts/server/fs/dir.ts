import { toBase64 } from "$ts/base64";
import { UserDirectory } from "$types/fs";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { UserToken } from "$ts/stores/user";
import { Log } from "$ts/console";

export async function readDirectory(path: string): Promise<UserDirectory> {
  const url = getServerUrl("/v2/fs/directory", { path: toBase64(path) });
  const token = UserToken.get();

  if (!url || !token) return null;

  const response = await axios.get(url, makeTokenOptions(token));

  if (response.status !== 200) return null;

  //!! THIS CODE IS NOT AT ALL DEFINITIVE OR WORKING

  return response.data as UserDirectory;
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
