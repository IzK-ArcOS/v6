import { AppRuntime } from "$ts/apps/runtime";
import { Nullable } from "./common";
import { ReadableStore } from "./writable";

export interface App {
  metadata: AppMetaData
  runtime: AppRuntime;
  content?: any;
  sideload?: SideloadInfo;
  id: string;
  size: Size;
  minSize: Size;
  maxSize: Size;
  pos: Coordinate;
  state: AppState;
}

export interface AppMetaData {
  name: string;
  description: string;
  author: string;
  version: string;
  icon: string;
  appGroup?: string;
}

export interface AppState {
  minimized: boolean;
  maximized: boolean;
  headless: boolean;
  fullscreen: boolean;
}

export type AppLibrary = ReadableStore<Nullable<Record<string, App>>>; // [id, instance]
export type Coordinate = { x: number, y: number };
export type Size = { w: number, h: number };
export type Processes = ReadableStore<Nullable<Record<number, App | "disposed">>>; // [pid, instance]

export interface SideloadInfo {
  module?: string;
  tag: string;
}

export type SideLoadStore = ReadableStore<Nullable<SideloadInfo[]>>;
