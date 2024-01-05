import { AppRuntime } from "$ts/apps/runtime";
import { Nullable } from "./common";
import { ReadableStore } from "./writable";

export interface App {
  metadata: AppMetaData;
  runtime: typeof AppRuntime;
  content?: any;
  sideload?: SideloadInfo;
  id: string;
  pid?: number;
  size: Size;
  minSize: Size;
  maxSize: Size;
  pos: Coordinate;
  state: AppState;
  controls: WindowControls;
  glass?: boolean;
  isOverlay?: boolean;
  loadCondition?: () => boolean | Promise<boolean>;
  singleInstance?: boolean;
  autoOpen?: boolean;
  contextMenu?: AppContextMenu;
}

export type AppMutator = ReadableStore<App>;

export interface WindowControls {
  minimize: boolean;
  maximize: boolean;
  close: boolean;
}

export interface AppMetaData {
  name: string;
  description: string;
  author: string;
  version: string;
  icon: string;
  appGroup?: string;
  core?: boolean;
  hidden?: boolean;
}

export interface AppState {
  minimized: boolean;
  maximized: boolean;
  headless: boolean;
  fullscreen: boolean;
  resizable: boolean;
}

export type AppLibrary = ReadableStore<Map<string, App>>; // [id, instance]
export type Coordinate = { x: number; y: number };
export type Size = { w: number; h: number };

export interface ContextMenuItem {
  sep?: boolean;
  caption?: string;
  icon?: string;
  image?: string;
  isActive?: (
    window: App,
    data: DOMStringMap,
    scope: string
  ) => boolean | Promise<boolean>;
  action?(window: App, data: DOMStringMap, scope: string): void;
  subItems?: ContextMenuItem[];
}

export type AppContextMenu = { [key: string]: ContextMenuItem[] };

export interface SideloadInfo {
  module?: string;
  tag: string;
}

export type SideLoadStore = ReadableStore<Nullable<SideloadInfo[]>>;
export interface ContextMenuInstance {
  x: number;
  y: number;
  items: ContextMenuItem[];
  scope?: string;
  scopeMap?: DOMStringMap;
  app?: App;
}