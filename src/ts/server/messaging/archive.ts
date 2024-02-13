import { UserDataStore } from "$ts/stores/user";
import { getAllMessages } from "./get";

export function getMessageArchive(): string[] {
  const udata = UserDataStore.get();

  if (!udata || !udata.appdata.MessagingApp) return [];

  return udata.appdata.MessagingApp.archive as string[];
}

export async function getArchivedMessages() {
  const archived = getMessageArchive();
  const messages = await getAllMessages();

  return messages.filter((m) => archived.includes(m.id));
}

export function archiveMessage(id: string) {
  const udata = UserDataStore.get();

  if (!udata.appdata.MessagingApp) udata.appdata.MessagingApp = { archive: [] };

  const archive = udata.appdata.MessagingApp.archive as string[];

  if (archive.includes(id)) return;

  archive.push(id);

  udata.appdata.MessagingApp.archive = archive;

  UserDataStore.set(udata);
}

export function unarchiveMessage(id: string) {
  const udata = UserDataStore.get();

  if (!udata.appdata.MessagingApp) udata.appdata.MessagingApp = { archive: [] };

  const archive = udata.appdata.MessagingApp.archive as string[];

  if (!archive.includes(id)) return;

  const index = archive.indexOf(id);

  archive.splice(index, 1);

  udata.appdata.MessagingApp.archive = archive;

  UserDataStore.set(udata);
}
