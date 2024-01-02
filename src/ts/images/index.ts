import { Log } from "$ts/console";
import * as Apps from "./apps";
import * as Branding from "./branding";
import * as Filesystem from "./filesystem";
import * as General from "./general";

export function getAllImages(): Record<string, string> {
  Log("images", "Getting all images");
  return { ...Branding, ...General, ...Apps, ...Filesystem };
}
