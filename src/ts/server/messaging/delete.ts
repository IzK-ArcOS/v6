import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { toBase64 } from "$ts/base64";
import { GlobalDispatch } from "$ts/process/dispatch/global";

export async function deleteMessage(id: string) {
  const base64 = toBase64(id);

  if (base64 == id) return false;

  const url = getServerUrl(Endpoints.MessagesDelete, { id: base64 });
  const token = UserToken.get();

  if (!url || !token) return false;

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    if (response.status !== 200) return false;

    GlobalDispatch.dispatch("message-flush");

    return true;
  } catch {
    return false;
  }
}
