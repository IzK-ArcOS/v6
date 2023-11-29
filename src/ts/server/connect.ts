import { ConnectedServer } from "$ts/stores/server";
import { testConnection } from "./test";

export async function ConnectToServer(
  host: string,
  authCode?: string
): Promise<boolean> {
  const tester = await testConnection(host, authCode);

  if (!tester) return false;

  ConnectedServer.set(tester);

  return true;
}
