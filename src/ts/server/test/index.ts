import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import { ConnectedServer, TEST_MODES } from "$ts/stores/server";
import ttlFetch from "$ts/util/ttlFetch";
import { Server, ServerMeta } from "$types/server";
import { getServerUrl } from "../util";
import { connectFailureLog, invalidResponseLog, testingServerLog, validResponseLog } from "./logs";

export async function testConnection(
  host: string,
  authCode: string = "",
  set = true
): Promise<Server | false> {
  Log("server/test", `Attempting to connect to ${host}`);

  for (const [secure, port] of TEST_MODES) {
    const server: Server = {
      secure,
      port,
      host,
      authCode,
    };

    testingServerLog(server);

    const url = getServerUrl(Endpoints.MetaData, {}, server);

    try {
      const response = await ttlFetch(url, {}, 10000);

      if (response.status !== 200) continue;

      validResponseLog(server);

      const meta = (await response.json()) as ServerMeta;

      server.meta = meta;

      if (set) ConnectedServer.set(server);

      return server;
    } catch {
      invalidResponseLog(server);

      continue;
    }
  }

  connectFailureLog(host);

  return false;
}
