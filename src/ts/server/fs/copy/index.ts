import { toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { sleep } from "$ts/util";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../../util";

export async function copyItem(source: string, destination: string) {
  Log(`server/fs/copy`, `Copying ${source} to ${destination}`);

  const sourceBase64 = toBase64(source);
  const targetBase64 = toBase64(destination);

  if (sourceBase64 == source || targetBase64 == destination) return false;

  const url = getServerUrl(Endpoints.FsCp, { path: sourceBase64, target: targetBase64 });
  const token = UserToken.get();

  if (!url || !token) return false;

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    return response.status === 200;
  } catch {
    return false;
  }
}

export async function copyMultiple(items: Record<string, string>) {
  for (const source in items) {
    const dest = items[source];

    await copyItem(source, dest);

    await sleep(55); // rate-limit cooldown
  }
}

export async function renameItem(oldPath: string, newPath: string) {
  Log(`server/fs/copy`, `Renaming ${oldPath} to ${newPath}`);

  const oldBase64 = toBase64(oldPath);
  const newBase64 = toBase64(newPath);

  if (oldBase64 == oldPath || newBase64 == newPath) return false;

  const url = getServerUrl(Endpoints.FsRename, {
    oldpath: oldBase64,
    newpath: newBase64,
  });
  const token = UserToken.get();

  if (!url || !token) return false;

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    return response.status === 200;
  } catch {
    return false;
  }
}

export async function renameMultiple(items: Record<string, string>) {
  for (const source in items) {
    const dest = items[source];

    await renameItem(source, dest);

    await sleep(55); // rate-limit cooldown
  }
}
