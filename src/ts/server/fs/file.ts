import { toBase64 } from "$ts/base64";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { ArcFile, PartialArcFile } from "$types/fs";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { getParentDirectory, readDirectory } from "./dir";

export async function readFile(path: string): Promise<ArcFile> {
  const url = getServerUrl(Endpoints.FsFile, {
    path: toBase64(path),
  });
  const token = UserToken.get();

  if (!url || !token) return null;

  const partial = await getPartialFile(path);

  if (!partial) return null;

  return {
    name: partial.filename,
    path,
    data: null /* !! REPLACE THIS WITH WORKING API ENDPOINT!*/,
    mime: partial.mime,
  };
}

export async function getPartialFile(path: string): Promise<PartialArcFile> {
  const parent = getParentDirectory(path);

  const dir = await readDirectory(parent);

  if (!dir) return null;

  return dir.files.filter((f) => f.scopedPath == path)[0];
}

export async function writeFile(
  path: string,
  blob: Blob,
  onUploadProgress?: (progress: any) => any
) {
  const url = getServerUrl("/fs/file/write", { path: toBase64(path) });
  const token = UserToken.get();

  if (!url) return null;

  const response = await axios.post(
    url,
    blob,
    makeTokenOptions(token, { onUploadProgress })
  );

  return response.status === 200;
}
