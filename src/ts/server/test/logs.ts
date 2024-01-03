import { Log } from "$ts/console";
import { LogLevel } from "$types/console";
import { Server } from "$types/server";

export function testingServerLog(server: Server) {
  Log(
    "server/test",
    `Testing ${server.host} on port ${server.port} (secure = ${server.secure})`,
    LogLevel.warn
  );
}

export function validResponseLog(server: Server) {
  Log(
    "server/test",
    `Got valid response from ${server.host} on port ${server.port} (secure = ${server.secure})`
  );
}

export function invalidResponseLog(server: Server) {
  Log(
    "server/test",
    `Didn't get valid response from ${server.host} on port ${server.port} (secure = ${server.secure})`,
    LogLevel.error
  );
}

export function connectFailureLog(host: string) {
  Log(
    "server/test",
    `Unable to connect to server ${host}: none of the modes match.`,
    LogLevel.critical
  );
}
