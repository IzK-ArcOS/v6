import { Log } from "$ts/console";
import { ConnectedServer } from "$ts/stores/server";
import ttlFetch from "$ts/util/ttlFetch";
import { get } from "svelte/store";
import { testConnection } from "./test";

export function setAuthcode(server: string, code: string): void {
  Log("server/authcode", `Adding authcode to ${server}`);

  let authCodes = localStorage.getItem("arcos-authcodes");
  if (!authCodes) authCodes = "{}";

  authCodes = JSON.parse(authCodes);

  authCodes[server] = code;

  localStorage.setItem("arcos-authcodes", JSON.stringify(authCodes));
}

export function getAuthcode(server: string) {
  Log("server/authcode", `Getting authcode for ${server}`);

  let authCodes = localStorage.getItem("arcos-authcodes");
  if (!authCodes) authCodes = "{}";

  authCodes = JSON.parse(authCodes);

  return authCodes[server];
}

export async function detectAuthcode(server: string): Promise<"protected" | "public" | "error"> {
  const cs = ConnectedServer.get();
  const test = await testConnection(server);

  if (!test) return "error";

  const host = get(ConnectedServer);

  ConnectedServer.set(cs);

  const req = await (await ttlFetch(`${host}/v2`, {}, 3000)).json();

  if (!req) return "error";

  return req.protected ? "protected" : "public";
}
