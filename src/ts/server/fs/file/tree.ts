import { getServerUrl, makeTokenOptions } from "$ts/server/util";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import { PartialArcFile } from "$types/fs";
import axios from "axios";

export async function GetFilesystemTree(): Promise<PartialArcFile[]> {
  const url = getServerUrl(Endpoints.FsTree);
  const token = UserToken.get();

  if (!url || !token) return [];

  try {
    const response = await axios.get(url, makeTokenOptions(token));

    if (response.status !== 200) return [];

    return response.data.data as PartialArcFile[];
  } catch {
    return [];
  }
}
