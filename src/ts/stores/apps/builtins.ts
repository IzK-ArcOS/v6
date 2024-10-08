import { KeyboardShortcuts } from "$apps/AcceleratorOverview/ts/app";
import { AppInfo } from "$apps/AppInfo/ts/app";
import { ArcFind } from "$apps/ArcFind/ts/app";
import { ArcTermApp as ArcTerm } from "$apps/ArcTerm/ts/app";
import { BugReports } from "$apps/BugReports/ts/app";
import { CalculatorApp } from "$apps/Calculator/ts/app";
import { DonutApp } from "$apps/DonutApp/ts/app";
import { ErrorDialog } from "$apps/ErrorDialog/ts/app";
import { ExitApp } from "$apps/Exit/ts/app";
import { FileManager } from "$apps/FileManager/ts/app";
import { FsProgress } from "$apps/FsProgress/ts/app";
import { HelpSupport } from "$apps/HelpSupport/ts/app";
import { IconLibrary } from "$apps/IconLibrary/ts/app";
import { ImageViewer } from "$apps/ImageViewer/ts/app";
import { LightsOff } from "$apps/LightsOff/ts/app";
import { LoadSaveDialog } from "$apps/LoadSaveDialog/ts/app";
import { LoggerApp } from "$apps/LoggerApp/ts/app";
import { MarkDownViewer } from "$apps/MarkDownViewer/ts/app";
import { MediaPlayer } from "$apps/MediaPlayer/ts/app";
import { MessagingApp } from "$apps/MessagingApp/ts/app";
import { OpenWith } from "$apps/OpenWith/ts/app";
import { ProcessManager } from "$apps/ProcessManager/ts/app";
import { QlorbApp } from "$apps/Qlorb/ts/app";
import { SecureContext } from "$apps/SecureContext/ts/app";
import { ServiceInfo } from "$apps/ServiceInfo/ts/app";
import { SettingsApp } from "$apps/Settings/ts/app";
import { ArcShell } from "$apps/Shell/ts/app";
import { TextEditor } from "$apps/TextEditor/ts/app";
import { desktopWallpaper } from "$apps/Wallpaper/ts/app";
import { WebBrowserApp } from "$apps/WebBrowser/ts/app";
import { App } from "$types/app";

export const builtinApps: Record<string, App> = {
  ArcShell,
  WebBrowserApp,
  KeyboardShortcuts,
  desktopWallpaper,
  ArcTerm,
  SettingsApp,
  AppInfo,
  ServiceInfo,
  LoggerApp,
  ErrorDialog,
  ProcessManager,
  QlorbApp,
  SecureContext,
  LightsOff,
  ExitApp,
  TextEditor,
  LoadSaveDialog,
  FsProgress,
  OpenWith,
  FileManager,
  MarkDownViewer,
  ImageViewer,
  IconLibrary,
  DonutApp,
  MediaPlayer,
  HelpSupport,
  MessagingApp,
  BugReports,
  ArcFind,
  CalculatorApp,
};
