import { toBase64 } from "$ts/base64";
import { Endpoints } from "$ts/stores/endpoint";
import { UserName, UserToken } from "$ts/stores/user";
import { Nullable } from "$types/common";
import { Message, PartialMessage } from "$types/messaging";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { getMessageArchive } from "./archive";

export async function getAllMessages(length = 30): Promise<PartialMessage[]> {
  const token = UserToken.get();
  const url = getServerUrl(Endpoints.MessagesList, { preview_length: length });

  if (!url || !token) return [];

  const response = await axios.get(url, makeTokenOptions(token));

  if (response.status !== 200) return [];

  return response.data.data as PartialMessage[];
}

export async function getMessage(id: string): Promise<Nullable<Message>> {
  const base64 = toBase64(id);

  if (base64 == id) return null;

  const token = UserToken.get();
  const url = getServerUrl(Endpoints.MessagesGet, { id: base64 });

  if (!url || !token) return null;

  const response = await axios.get(url, makeTokenOptions(token));

  if (response.status !== 200) return null;

  return response.data.data as Message;
}

export async function getInboxMessages() {
  const messages = await getAllMessages();
  const archive = getMessageArchive() || [];
  const username = UserName.get();

  return messages.filter(
    (m) =>
      !archive.includes(m.id) &&
      (username != m.sender || (username == m.receiver && username == m.sender))
  );
}

export async function getSentMessages() {
  const messages = await getAllMessages();

  let returnValue: PartialMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    if (messages[i].sender == UserName.get()) returnValue.push(messages[i]);
  }

  return returnValue;
}

export async function getReceivedMessages(length = 30) {
  const messages = await getAllMessages(length);

  let returnValue: PartialMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    if (messages[i].receiver == UserName.get() && messages[i].sender != UserName.get())
      returnValue.push(messages[i]);
  }

  return returnValue;
}

export async function getUnreadMessages(length = 30) {
  const messages = await getReceivedMessages(length);

  let returnValue: PartialMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    if (!messages[i].read) returnValue.push(messages[i]);
  }

  return returnValue;
}
