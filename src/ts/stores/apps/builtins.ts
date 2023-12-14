import { ArcShell } from "$apps/Shell/ts/app";
import { desktopWallpaper } from "$apps/Wallpaper/ts/app";
import { ArcTermApp as ArcTerm } from "$apps/ArcTerm/ts/app";
import { App } from "$types/app";

export const builtinApps: Record<string, App> = {
  desktopWallpaper,
  ArcShell,
  ArcTerm,
}