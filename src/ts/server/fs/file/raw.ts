import { toBase64 } from "$ts/base64";
import { ConnectedServer } from "$ts/stores/server";
import { UserToken } from "$ts/stores/user";

export function getRawFilePath(path: string) {
  const token = UserToken.get();
  const server = ConnectedServer.get();
  const base64 = toBase64(path);

  if (base64 == path || !token || !server) return;

  const proto = `http${server.secure ? "s" : ""}`;

  return `${proto}://${server.host}:${server.port}/fs/file/raw?path=${base64}&token=${token}&ac=${
    server.authCode || ""
  }`;
}
