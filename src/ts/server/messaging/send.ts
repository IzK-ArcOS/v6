import { toBase64 } from "$ts/base64";
import { Endpoints } from "$ts/stores/endpoint";
import { ConnectedServer } from "$ts/stores/server";
import { UserToken } from "$ts/stores/user";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { GlobalDispatch } from "$ts/process/dispatch/global";

export async function sendMessage(receivers: string[], body: string): Promise<boolean> {
  const token = UserToken.get();

  if (!ConnectedServer.get() || !token) return false;

  for (const receiver of receivers) {
    const base64 = toBase64(receiver);

    if (base64 == receiver) return false;

    const url = getServerUrl(Endpoints.MessagesSend, { target: base64 });

    try {
      const response = await axios.post(url, body, makeTokenOptions(token));

      if (response.status !== 200) return false;
    } catch {
      return false;
    }
  }

  GlobalDispatch.dispatch("message-flush");

  return true;
}

export async function replyToMessage(id: string, receiver: string, body: string): Promise<boolean> {
  const base64 = toBase64(receiver);

  if (base64 == id) return false;

  const url = getServerUrl(Endpoints.MessagesReply, { target: base64, id });
  const token = UserToken.get();

  if (!token || !url) return false;

  try {
    const response = await axios.post(url, body, makeTokenOptions(token));

    if (response.status !== 200) return false;

    GlobalDispatch.dispatch("message-flush");

    return true;
  } catch {
    return false;
  }
}
