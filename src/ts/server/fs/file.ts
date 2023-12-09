import { toBase64 } from "$ts/base64";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { ArcFile, PartialArcFile } from "$types/fs";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { getParentDirectory, readDirectory } from "./dir";
import { Log } from "$ts/console";

export async function readFile(path: string): Promise<ArcFile> {
  Log("server/fs/file", `Reading "${path}"...`);
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
  const parent = getParentDirectory(path);
  const dir = await readDirectory(parent);
  const filename = getFilenameFromPath(path);

  if (!dir) return null;

  return dir.files.filter((f) => f.filename == filename)[0];
}

export async function writeFile(
  path: string,
  blob: Blob,
  onUploadProgress?: (progress: any) => any
) {
  const url = getServerUrl(Endpoints.FsFileWrite, { path: toBase64(path) });
  const token = UserToken.get();

  if (!url) return null;

  const response = await axios.post(
    url,
    blob,
    makeTokenOptions(token, { onUploadProgress })
  );

  return response.status === 200;
}

export function getFilenameFromPath(path: string): string {
  const split = path.split("/");

  return split[split.length - 1];
}
