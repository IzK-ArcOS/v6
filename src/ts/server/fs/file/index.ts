import { toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { LogLevel } from "$types/console";
import { ArcFile, PartialArcFile, PartialUserDir, WriteFileReturnValue } from "$types/fs";
import axios, { AxiosError } from "axios";
import { getServerUrl, makeTokenOptions } from "../../util";
import { getParentDirectory, readDirectory } from "../dir";
import { parseFilename, pathToFriendlyName } from "../util";

export async function readFile(path: string): Promise<ArcFile> {
  Log("server/fs/file", `Reading file ${path}`);

  const base64 = toBase64(path);

  if (base64 == path) return null;

  const url = getServerUrl(Endpoints.FsFileGet, {
    path: base64,
  });
  const token = UserToken.get();

  if (path.startsWith("@client/")) return await readClientFile(path);

  if (!url || !token) return null;

  const partial = await getPartialFile(path);

  if (!partial) return null;

  try {
    const contents = partial.readProxy
      ? await partial.readProxy(partial)
      : (await axios.get(url, makeTokenOptions(token, { responseType: "blob" }))).data;

    const file: ArcFile = {
      name: partial.filename,
      path,
      data: contents,
      mime: partial.mime,
      virtual: partial.virtual,
    };

    return file;
  } catch {
    return null;
  }
}

export async function readClientFile(path: string): Promise<ArcFile> {
  if (!path.startsWith("@client/")) return null;

  const data: ArcFile = {
    name: pathToFriendlyName(path),
    path,
    data: null,
    mime: null,
  };

  try {
    const clientUrl = path.replace("@client/", "./");
    const response = await axios.get(clientUrl, { responseType: "blob" });

    if (response.status !== 200) return null;

    data.mime = response.headers["content-type"] || "text/plain";
    data.data = response.data;

    return data;
  } catch {
    return null;
  }
}

export async function getPartialFile(path: string): Promise<PartialArcFile> {
  Log("server/fs/file", `Getting partial file of ${path}`);

  if (path.startsWith("@client")) {
    return {
      scopedPath: path,
      filename: parseFilename(path),
      mime: "text/plain",
      dateCreated: new Date().getTime(),
      dateModified: new Date().getTime(),
    };
  }

  const parent = getParentDirectory(path);
  const dir = await readDirectory(parent);
  const filename = getFilenameFromPath(path);

  if (!dir) return null;

  return dir.files.filter((f) => f.filename == filename)[0];
}

export async function getPartialDirectory(path: string): Promise<PartialUserDir> {
  Log("server/fs/file", `Getting partial dir of ${path}`);

  if (path.startsWith("@client")) return null;

  const parent = getParentDirectory(path);
  const dir = await readDirectory(parent);
  const foldername = getFilenameFromPath(path);

  if (!dir) return null;

  return dir.directories.filter((f) => f.name == foldername)[0];
}

export async function writeFile(
  path: string,
  blob: Blob,
  dispatch = true,
  onUploadProgress?: (progress: any) => any
): Promise<WriteFileReturnValue> {
  if (!path) return null;

  if (path.startsWith("@client")) {
    Log(
      "server/fs/file",
      `Not attempting to write to client file "${path}" as it is read-only!`,
      LogLevel.warn
    );

    return "success";
  }

  Log("server/fs/file", `Writing ${blob.size} bytes to ${path}`);

  const base64 = toBase64(path);

  if (base64 == path) return null;

  const url = getServerUrl(Endpoints.FsFileWrite, { path: base64 });
  const token = UserToken.get();

  if (!url) return null;

  try {
    const response = await axios.post(url, blob, makeTokenOptions(token, { onUploadProgress }));

    if (dispatch && response.status === 200) GlobalDispatch.dispatch("fs-flush");

    return "success";
  } catch (e) {
    switch (e.response.status) {
      case 413:
        return "err_noSpace";
      case 500:
        return "err_serverError";
      default:
        return "err_unknown";
    }
  }
}

export function getFilenameFromPath(path: string): string {
  const split = path.split("/");

  return split[split.length - 1];
}
