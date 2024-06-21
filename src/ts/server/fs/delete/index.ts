import { toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { sleep } from "$ts/util";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../../util";

export async function deleteItem(path: string, dispatch = true): Promise<boolean> {
  Log("server/fs/delete", `Deleting ${path}`);

  const base64 = toBase64(path);

  if (path == base64) return false;

  const url = getServerUrl(Endpoints.FsRm, { path: base64 });
  const token = UserToken.get();

  if (!url || !token) return false;

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    if (dispatch) GlobalDispatch.dispatch("fs-flush");

    return response.status === 200;
  } catch {
    return false;
  }
}

export async function deleteMultiple(paths: string[]) {
  Log("server/fs/delete", `Deleting ${paths.length} items`);

  for (const path of paths) {
    await deleteItem(path, false);

    await sleep(55); // rate-limit cooldown
  }

  GlobalDispatch.dispatch("fs-flush");
}
