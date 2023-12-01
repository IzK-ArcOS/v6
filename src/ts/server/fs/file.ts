import { toBase64 } from "$ts/base64";
import { ArcFile, PartialArcFile } from "$types/fs";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";
import { UserToken } from "$ts/stores/user";
import { getParentDirectory, readDirectory } from "./dir";

export async function readFile(path: string): Promise<ArcFile> {
  const url = getServerUrl("/v2/fs/file", {
    path: toBase64(path),
  });
  const token = UserToken.get();

  if (!url || !token) return null;

  const response = await axios.get(url, makeTokenOptions(token));

  if (response.status !== 200) return null;
}

export async function getPartialFile(path: string): Promise<PartialArcFile> {
  const parent = getParentDirectory(path);

  const dir = await readDirectory(parent);

  if (!dir) return null;

  return dir.files.filter((f) => f.scopedPath == path)[0];
}
