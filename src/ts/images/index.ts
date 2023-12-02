import { Log } from "$ts/console";
import * as Branding from "./branding";
import * as General from "./general";

export function getAllImages(): Record<string, string> {
  Log("images", "Getting all images");
  return { ...Branding, ...General };
}
