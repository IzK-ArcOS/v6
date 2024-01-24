import { AppInfo } from "$apps/AppInfo/ts/app";
import { ArcTermApp as ArcTerm } from "$apps/ArcTerm/ts/app";
import { ErrorDialog } from "$apps/ErrorDialog/ts/app";
import { ExitApp } from "$apps/Exit/ts/app";
import { FileManager } from "$apps/FileManager/ts/app";
import { FsProgress } from "$apps/FsProgress/ts/app";
import { LightsOff } from "$apps/LightsOff/ts/app";
import { LoadSaveDialog } from "$apps/LoadSaveDialog/ts/app";
import { LoggerApp } from "$apps/LoggerApp/ts/app";
import { OpenWith } from "$apps/OpenWith/ts/app";
import { ProcessManager } from "$apps/ProcessManager/ts/app";
import { QlorbApp } from "$apps/Qlorb/ts/app";
import { SecureContext } from "$apps/SecureContext/ts/app";
import { ServiceInfo } from "$apps/ServiceInfo/ts/app";
import { SettingsApp } from "$apps/Settings/ts/app";
import { ArcShell } from "$apps/Shell/ts/app";
import { TextEditor } from "$apps/TextEditor/ts/app";
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
  ServiceInfo,
  LightsOff,
  ExitApp,
  FileManager,
  TextEditor,
  LoadSaveDialog,
  FsProgress,
  OpenWith
}
