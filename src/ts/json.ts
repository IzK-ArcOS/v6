import { Nullable } from "$types/common";

export function tryParse(content: string): any | false {
  try {
    return JSON.parse(content);
  } catch {
    return false;
  }
}

export function tryJsonConvert<T>(content: string): Nullable<T> {
  try {
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}
