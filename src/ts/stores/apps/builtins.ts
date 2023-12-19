import { ArcTermApp as ArcTerm } from "$apps/ArcTerm/ts/app";
import { ElementsApp } from "$apps/Elements/ts/app";
import { LogListApp as LogList } from "$apps/LogList/ts/app";
import { SettingsApp } from "$apps/Settings/ts/app";
import { ArcShell } from "$apps/Shell/ts/app";
import { desktopWallpaper } from "$apps/Wallpaper/ts/app";
import { App } from "$types/app";

export const builtinApps: Record<string, App> = {
  desktopWallpaper,
  ArcShell,
  ArcTerm,
  LogList,
  ElementsApp,
  SettingsApp
}