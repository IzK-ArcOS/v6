import { Log } from "$ts/console";
import { TEST_MODES } from "$ts/stores/server";
import ttlFetch from "$ts/util/ttlFetch";
import { Server, ServerMeta } from "$types/server";
import { getServerUrl } from "../util";
import {
  connectFailureLog,
  invalidResponseLog,
  testingServerLog,
  validResponseLog,
} from "./logs";

export async function testConnection(
  host: string,
  authCode: string = ""
): Promise<Server | false> {
  Log("server/test", `Attempting to connect to ${host}`);

  for (let i = 0; i < TEST_MODES.length; i++) {
    const mode = TEST_MODES[i];

    const s: Server = {
      secure: mode[0],
      port: mode[1],
      host,
      authCode,
    };

    testingServerLog(s);

    const url = getServerUrl("/v2", {}, s);

    try {
      const response = await ttlFetch(url, {}, 10000);

      if (response.status === 200) {
        validResponseLog(s);

        return { ...s, meta: (await response.json()) as ServerMeta };
      }
    } catch {
      invalidResponseLog(s);

      continue;
    }
  }

  connectFailureLog(host);

  return false;
}
