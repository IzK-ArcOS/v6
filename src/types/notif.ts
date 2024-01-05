import { Nullable } from "./common";
import { ErrorButton } from "./error";
import { ReadableStore } from "./writable";

export interface Notification {
  title: string;
  message: string;
  icon?: string;
  image?: string;
  timeout?: number;
  buttons?: ErrorButton[];
  timestamp?: number;
}

export type NotificationStore = ReadableStore<Nullable<Map<string, Notification>>>;