import { ConnectedServer } from "$ts/stores/server";
import { Params, Server } from "$types/server";

export function getServerUrl(
  path: string,
  params?: Params,
  server?: Server
): string {
  server ||= ConnectedServer.get();

  const protocol = server.secure ? "https" : "http";
  const hostname = server.host || ConnectedServer.get();
  const port = server.port || 3333;

  if (!hostname) return null;

  const paramStr = compileParams({
    ...(params || {}),
    ac: server.authCode || "",
  });

  return `${protocol}://${hostname}:${port}${path}${paramStr}`;
}

export function compileParams(params: Params): string {
  let result = "?";

  const entries = Object.entries(params);

  for (let i = 0; i < entries.length; i++) {
    const param = entries[i];

    result += `${param[0]}=${param[1]}&`;
  }

  return result;
}

export function makeTokenOptions(token: string, additional?: object): object {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...additional,
  };
}
