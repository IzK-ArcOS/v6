import { TEST_MODES } from "$ts/stores/server";
import { getServerUrl } from "./util";
import axios from "axios";

export async function testConnection(
  host: string,
  authCode: string = ""
): Promise<Server | false> {
  for (let i = 0; i < TEST_MODES.length; i++) {
    const mode = TEST_MODES[i];

    const server: Server = {
      secure: mode[0],
      port: mode[1],
      host,
      authCode,
    };

    const url = getServerUrl("/v2", server);
    const response = await axios.get(url);

    if (response.status === 200)
      return { ...server, meta: response.data as ServerMeta };
  }

  return false;
}
