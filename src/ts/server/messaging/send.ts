import { toBase64 } from "$ts/base64";
import { Endpoints } from "$ts/stores/endpoint";
import { ConnectedServer } from "$ts/stores/server";
import { UserToken } from "$ts/stores/user";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";

export async function sendMessage(receivers: string[], body: string): Promise<boolean> {
  const token = UserToken.get();

  if (!ConnectedServer.get() || !token) return false;

  for (const receiver of receivers) {
    const url = getServerUrl(Endpoints.MessagesSend, { target: toBase64(receiver) });
    const response = await axios.post(url, body, makeTokenOptions(token));

    if (response.status !== 200) return false;
  }

  return true;
}

export async function replyToMessage(id: string, receiver: string, body: string): Promise<boolean> {
  const url = getServerUrl(Endpoints.MessagesReply, { target: toBase64(receiver), id });
  const token = UserToken.get();

  if (!token || !url) return false;

  const response = await axios.post(url, body, makeTokenOptions(token));

  return response.status === 200;
}
