import { getServerUrl } from "../util";
import axios from "axios";
import { getUserData } from "./data";
import { UserData, UserName, UserToken } from "$ts/stores/user";

export async function Authenticate(username: string, password: string) {
  const url = getServerUrl("/v2/token");
  const formData = new FormData();

  formData.set("username", username);
  formData.set("password", password);

  const response = await axios.post<CreateTokenResponse>(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (response.status !== 200) return false;

  const token = response.data.access_token;
  const userdata = await getUserData(token);

  if (!userdata) return false;

  UserData.set(userdata);
  UserName.set(username);
  UserToken.set(token);

  return true;
}
