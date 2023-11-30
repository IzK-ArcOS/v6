import * as Branding from "./branding";

export function getAllImages(): Record<string, string> {
  return { ...Branding };
}
