import { Log } from "$ts/console";

export function getServer(): string {
  Log("server/multi", "Getting any available server");

  const server = localStorage.getItem("arcos-current-server");

  if (!server) {
    const servers = getAllServers();

    if (!servers.length) {
      return null;
    }

    const server = servers[servers.length - 1];

    setServer(server);

    return server;
  }

  return localStorage.getItem("arcos-current-server");
}

export function instanceHasServers(): boolean {
  return getServer() && !!getAllServers().length;
}

export function getAllServers(): string[] {
  Log("server/multi", "Getting saved servers from arcos-servers");

  if (!localStorage.getItem("arcos-servers")) return [];

  return JSON.parse(localStorage.getItem("arcos-servers")) as string[];
}

export function addServer(server: string, makeDefault = true): void {
  Log("server/multi", `Adding server ${server}`);

  const servers = getAllServers();

  if (!servers.includes(server)) servers.push(server);

  localStorage.setItem("arcos-servers", JSON.stringify(servers));

  if (makeDefault) setServer(server);
}

export function removeServer(server: string): boolean {
  Log("server/multi", `Removing server ${server}`);

  const servers = getAllServers();

  if (!servers.includes(server)) return false;

  servers.splice(servers.indexOf(server), 1);

  localStorage.setItem("arcos-servers", JSON.stringify(servers));

  return true;
}

export function setServer(server: string) {
  Log("server/multi", `Setting preferred server to ${server}`);

  localStorage.setItem("arcos-current-server", server);
  localStorage.removeItem("arcos-remembered-token");
}
