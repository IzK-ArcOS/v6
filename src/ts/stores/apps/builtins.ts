import { App } from "$types/app";
import { ArcTermApp as ArcTerm } from "../../../apps/ArcTerm/ts/app";
import { desktopWallpaper } from "../../../apps/Wallpaper/ts/app";

export const builtinApps: Record<string, App> = {
  desktopWallpaper,
  ArcTerm
}