export function getServer(): string {
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
  if (!localStorage.getItem("arcos-servers")) return [];

  return JSON.parse(localStorage.getItem("arcos-servers")) as string[];
}

export function addServer(server: string, makeDefault = true): void {
  const servers = getAllServers();

  if (!servers.includes(server)) servers.push(server);

  localStorage.setItem("arcos-servers", JSON.stringify(servers));

  if (makeDefault) setServer(server);
}

export function removeServer(server: string): boolean {
  const servers = getAllServers();

  if (!servers.includes(server)) return false;

  servers.splice(servers.indexOf(server), 1);

  localStorage.setItem("arcos-servers", JSON.stringify(servers));

  return true;
}

export function setServer(server: string) {
  localStorage.setItem("arcos-current-server", server);
  localStorage.removeItem("arcos-remembered-token");
}
