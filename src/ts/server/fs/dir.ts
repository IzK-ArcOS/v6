import { toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { GlobalDispatch } from "$ts/process/dispatch/global";
import { Endpoints } from "$ts/stores/endpoint";
import { DummyUserDirectory } from "$ts/stores/filesystem";
import { UserToken } from "$ts/stores/user";
import { UserDirectory } from "$types/fs";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { sortDirectories, sortFiles } from "./sort";

export async function readDirectory(path: string): Promise<UserDirectory> {
  Log("server/fs/dir", `Reading directory ${path}`);

  const base64 = toBase64(path);

  if (base64 == path) return DummyUserDirectory;

  const url = getServerUrl(Endpoints.FsDirectory, { path: base64 });
  const token = UserToken.get();

  if (!url || !token) return DummyUserDirectory;

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    if (response.status !== 200) return DummyUserDirectory;

    const data = response.data.data as UserDirectory;

    data.directories = sortDirectories(data.directories);
    data.files = sortFiles(data.files);

    return data as UserDirectory;
  } catch {
    return DummyUserDirectory;
  }
}

export async function createDirectory(path: string): Promise<boolean> {
  Log("server/fs/dir", `Creating directory ${path}`);

  const base64 = toBase64(path);

  if (base64 == path) return null;

  const url = getServerUrl(Endpoints.FsDirCreate, { path: base64 });
  const token = UserToken.get();

  if (!url || !token) return false;

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    GlobalDispatch.dispatch("fs-flush");

    return response.status === 200;
  } catch {
    return false;
  }
}

export function getParentDirectory(p: string): string {
  Log("server/fs/dir", `Getting parent directory of ${p}`);

  const split = p.split("/");

  if (p == "./") return p;
  if (!split.length) return p;
  if (split.length == 1) return "./";

  split.splice(-1);

  const newPath = split.join("/");

  return newPath;
}
