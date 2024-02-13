import { manualCrash } from "$ts/bugrep/crash";
import { isStoredEndpoint } from "$ts/stores/endpoint";
import { ConnectedServer } from "$ts/stores/server";
import { Params, Server } from "$types/server";
import { AxiosRequestConfig } from "axios";

/**
 * Get endpoint URL of the current server
 * @param path The endpoint path (start with a `/`, don't end with one)
 * @param params Optinally any `URLSearchParams` to pass to the endpoint
 * @param server Optionally the server to use
 * @returns A string containing the full URL, or `null` if no server can be used.
 */
export function getServerUrl(path: string, params?: Params, server?: Server): string {
  if (!isStoredEndpoint(path)) {
    manualCrash("src/ts/server/util.ts", "getServerUrl: The path must be part of the Endpoints store.");

    return null;
  }

  server ||= ConnectedServer.get();

  if (!server) return null;

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

  for (const [key, value] of entries) {
    result += `${key}=${value}&`;
  }

  return result;
}

export function makeTokenOptions(token: string, additional?: AxiosRequestConfig<any>): object {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...additional,
  };
}
