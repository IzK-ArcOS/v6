import { toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { sleep } from "$ts/util";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";

export async function deleteItem(path: string, dispatch = true): Promise<boolean> {
  Log("server/fs/delete", `Deleting ${path}`);

  const url = getServerUrl(Endpoints.FsRm, { path: toBase64(path) });
  const token = UserToken.get();

  if (!url || !token) return false;

  const response = await axios.get(url, makeTokenOptions(token));

  if (dispatch) GlobalDispatch.dispatch("fs-flush");

  return response.status === 200;
}

export async function deleteMultiple(paths: string[]) {
  Log("server/fs/delete", `Deleting ${paths.length} items`);

  for (const path of paths) {
    await deleteItem(path, false);

    await sleep(350) // rate-limit cooldown
  }

  GlobalDispatch.dispatch("fs-flush")
}