import { AppInfo } from "$apps/AppInfo/ts/app";
import { ArcTermApp as ArcTerm } from "$apps/ArcTerm/ts/app";
import { ErrorDialog } from "$apps/ErrorDialog/ts/app";
import { LoggerApp } from "$apps/LoggerApp/ts/app";
import { ProcessManager } from "$apps/ProcessManager/ts/app";
import { QlorbApp } from "$apps/Qlorb/ts/app";
import { SecureContext } from "$apps/SecureContext/ts/app";
import { ServiceInfo } from "$apps/ServiceInfo/ts/app";
import { SettingsApp } from "$apps/Settings/ts/app";
import { ArcShell } from "$apps/Shell/ts/app";
import { desktopWallpaper } from "$apps/Wallpaper/ts/app";
import { App } from "$types/app";

export const builtinApps: Record<string, App> = {
  desktopWallpaper,
  ArcShell,
  ArcTerm,
  SettingsApp,
  AppInfo,
  LoggerApp,
  ErrorDialog,
  ProcessManager,
  QlorbApp,
  SecureContext,
  ServiceInfo
}
