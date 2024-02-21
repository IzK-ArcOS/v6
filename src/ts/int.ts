import { Nullable } from "$types/common";

export function tryParseInt(input: string): Nullable<number> {
  try {
    return parseInt(input);
  } catch {
    return null;
  }
}
