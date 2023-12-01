import { Store } from "$ts/writable";
import { Report } from "$types/bugrep";

export const CrashReport = Store<Report>();
export const CRASHING = Store<boolean>(false);

export const CRASH_BLACKLIST = [
  "NotAllowedError",
  "NotSupportedError",
  "AbortError",
  "AxiosError",
  "ClientResponseError",
];
