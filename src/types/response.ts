import { UserData } from "./user";

export interface UserDataResponse {
  username: string;
  properties: UserData;
  id: number;
}

export interface CreateTokenResponse {
  access_token: string;
}
