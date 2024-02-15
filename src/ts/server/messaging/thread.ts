import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { Message, PartialMessage, PartiallyExtendedMessage } from "$types/messaging";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { toBase64 } from "$ts/base64";
import { getAllMessages, getMessage } from "./get";

export async function getFullMessageTree(): Promise<PartiallyExtendedMessage[]> {
  const url = getServerUrl(Endpoints.MessagesThread);
  const token = UserToken.get();

  if (!url || !token) return [];

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    if (response.status !== 200) return [];

    return response.data.data as PartiallyExtendedMessage[];
  } catch {
    return [];
  }
}

export async function getPartialTree(id: string): Promise<PartiallyExtendedMessage> {
  const base64 = toBase64(id);

  if (id == base64) return null;

  const url = getServerUrl(Endpoints.MessagesThread, { id: base64 });
  const token = UserToken.get();

  if (!url || !token) return null;

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    if (response.status !== 200) return null;

    return response.data.data as PartiallyExtendedMessage;
  } catch {
    return null;
  }
}

export async function getParentMessage(id: string, store?: PartialMessage[]): Promise<Message> {
  const messages = store || (await getAllMessages());

  let replier: string;

  for (let i = 0; i < messages.length; i++) {
    if (messages[i].id == id) replier = messages[i].replyingTo;
  }

  if (!replier) return;

  const parent = (await getMessage(replier)) as Message;

  if (parent.replyingTo) return await getParentMessage(replier, messages);

  return parent;
}
