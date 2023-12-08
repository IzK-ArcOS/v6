import { fromBase64, toBase64 } from "$ts/base64";
import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import { UserDataStore, UserName, UserToken } from "$ts/stores/user";
import { CreateTokenResponse } from "$types/response";
import axios from "axios";
import { getServerUrl } from "../util";
import { getUserData } from "./data";

export async function Authenticate(
  username: string,
  password: string,
  save = true
): Promise<boolean> {
  Log("server/user/auth", `Attempting to authenticate "${username}"`);

  const url = getServerUrl(Endpoints.Token);
  const formData = new FormData();

  if (!url) return false;

  formData.set("username", username);
  formData.set("password", password);

  try {
    const response = await axios.post<CreateTokenResponse>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status !== 200) return false;

    const token = response.data.access_token;
    const userdata = await getUserData(token);

    if (!userdata) return false;

    UserDataStore.set(userdata);
    UserName.set(username);
    UserToken.set(token);

    if (save) setRememberedToken(username, password);

    return true;
  } catch {
    return false;
  }
}

export async function doRememberedAuth() {
  Log(
    "server/user/auth",
    "Attempting authentication using arcos-remembered-token"
  );
  const token = localStorage.getItem("arcos-remembered-token");

  if (!token) return false;

  const [username, password] = fromBase64(token).split(":");

  return await Authenticate(username, password);
}

export async function setRememberedToken(username: string, password: string) {
  Log("server/user/auth", `Setting arcos-remembered-token to user ${username}`);
  const token = toBase64(`${username}:${password}`);

  localStorage.setItem("arcos-remembered-token", token);

  return token;
}
