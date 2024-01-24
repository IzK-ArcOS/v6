import { toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { deleteNotification, sendNotification } from "$ts/notif";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { sleep } from "$ts/util";
import { ArcFile, PartialArcFile } from "$types/fs";
import { Notification } from "$types/notif";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../../util";
import { getParentDirectory, readDirectory } from "../dir";

export async function readFile(path: string): Promise<ArcFile> {
  Log("server/fs/file", `Reading file ${path}`);

  const url = getServerUrl(Endpoints.FsFileGet, {
    path: toBase64(path),
  });
  const token = UserToken.get();

  if (!url || !token) return null;

  const partial = await getPartialFile(path);

  if (!partial) return null;

  const contents = await axios.get(
    url,
    makeTokenOptions(token, { responseType: "blob" })
  );

  const file: ArcFile = {
    name: partial.filename,
    path,
    data: contents.data,
    mime: partial.mime,
  };

  return file;
}

export async function getPartialFile(path: string): Promise<PartialArcFile> {
  Log("server/fs/file", `Getting partial file of ${path}`)
  const parent = getParentDirectory(path);
  const dir = await readDirectory(parent);
  const filename = getFilenameFromPath(path);

  if (!dir) return null;

  return dir.files.filter((f) => f.filename == filename)[0];
}

export async function writeFile(
  path: string,
  blob: Blob,
  dispatch = true,
  onUploadProgress?: (progress: any) => any,
) {
  Log("server/fs/file", `Writing ${blob.size} bytes to ${path}`);

  const url = getServerUrl(Endpoints.FsFileWrite, { path: toBase64(path) });
  const token = UserToken.get();

  if (!url) return null;

  try {
    const response = await axios.post(
      url,
      blob,
      makeTokenOptions(token, { onUploadProgress })
    );

    if (dispatch) GlobalDispatch.dispatch("fs-flush")

    return response.status === 200;
  } catch {
    return false;
  }
}

export async function writeFileAnnounced(path: string, blob: Blob, notif: Notification) {
  const id = await sendNotification(notif);

  await sleep(500);

  const result = await writeFile(path, blob);

  deleteNotification(id);

  return result;
}

export function getFilenameFromPath(path: string): string {
  const split = path.split("/");

  return split[split.length - 1];
}