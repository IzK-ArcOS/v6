import { Log } from "$ts/console";
import * as Apps from "./apps";
import * as Branding from "./branding";
import * as General from "./general";
import * as Filesystem from "./filesystem";

export function getAllImages(): Record<string, string> {
  Log("images", "Getting all images");
  return { ...Branding, ...General, ...Apps, ...Filesystem };
}
