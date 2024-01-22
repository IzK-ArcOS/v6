import { toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { sleep } from "$ts/util";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";

export async function copyItem(source: string, destination: string) {
  Log(`server/fs/copy`, `Copying ${source} to ${destination}`);

  const url = getServerUrl(Endpoints.FsCp, { path: toBase64(source), target: toBase64(destination) });
  const token = UserToken.get();

  if (!url || !token) return false;

  const response = await axios.get(url, makeTokenOptions(token));

  return response.status === 200;
}

export async function copyMultiple(items: Record<string, string>) {
  for (const source in items) {
    const dest = items[source];

    await copyItem(source, dest);

    await sleep(350) // rate-limit cooldown
  }
}

export async function renameItem(oldPath: string, newPath: string) {
  Log(`server/fs/copy`, `Renaming ${oldPath} to ${newPath}`);

  const url = getServerUrl(Endpoints.FsRename, { oldpath: toBase64(oldPath), newpath: toBase64(newPath) });
  const token = UserToken.get();

  if (!url || !token) return false;

  const response = await axios.get(url, makeTokenOptions(token));

  return response.status === 200;
}

export async function renameMultiple(items: Record<string, string>) {
  for (const source in items) {
    const dest = items[source];

    await renameItem(source, dest);

    await sleep(350) // rate-limit cooldown
  }
}