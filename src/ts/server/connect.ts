import { Log } from "$ts/console";
import { ConnectedServer } from "$ts/stores/server";
import { testConnection } from "./test";

export async function ConnectToServer(host: string, authCode?: string): Promise<boolean> {
  Log("server/connect", `Attempting to connect to "${host}" with <ac>`);

  const tester = await testConnection(host, authCode);

  if (!tester) return false;

  ConnectedServer.set(tester);

  return true;
}
