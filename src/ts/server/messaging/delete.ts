import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { toBase64 } from "$ts/base64";

export async function deleteMessage(id: string) {
  const url = getServerUrl(Endpoints.MessagesDelete, { id: toBase64(id) });
  const token = UserToken.get();

  if (!url || !token) return false;

  const response = await axios.get(url, makeTokenOptions(token));

  if (response.status !== 200) return false;

  return true;
}