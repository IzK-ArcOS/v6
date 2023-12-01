import { getServerUrl } from "../util";
import axios from "axios";
import { getUserData } from "./data";
import { UserDataStore, UserName, UserToken } from "$ts/stores/user";
import { CreateTokenResponse } from "$types/response";
import { Log } from "$ts/console";

export async function Authenticate(
  username: string,
  password: string
): Promise<boolean> {
  Log("server/user/auth", `Attempting to authenticate "${username}"`);

  const url = getServerUrl("/v2/token");
  const formData = new FormData();

  if (!url) return false;

  formData.set("username", username);
  formData.set("password", password);

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

  return true;
}
