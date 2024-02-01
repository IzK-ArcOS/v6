import { toBase64 } from "$ts/base64";
import { ConnectedServer } from "$ts/stores/server";
import { UserToken } from "$ts/stores/user";

export function getRawFilePath(path: string) {
  const token = UserToken.get();
  const server = ConnectedServer.get();

  if (!token || !server) return;

  const proto = `http${server.secure ? "s" : ""}`;

  return `${proto}://${server.host}:${server.port}/fs/file/raw?path=${toBase64(path)}&token=${token}&ac=${server.authCode || ""}`;
}