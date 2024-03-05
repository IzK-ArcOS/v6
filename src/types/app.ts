import { ArticlePath } from "$apps/HelpSupport/ts/types";
import { AppRuntime } from "$ts/apps/runtime";
import { AppKeyCombinations } from "./accelerator";
import { MaybePromise, Nullable } from "./common";
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
  noOverlayShade?: boolean;
  loadCondition?: () => MaybePromise<boolean>;
  spawnCondition?: () => MaybePromise<boolean>;
  singleInstance?: boolean;
  autoOpen?: boolean;
  contextMenu?: AppContextMenu;
  accelerators?: AppKeyCombinations;
  elevated?: boolean;
  altMenu?: ContextMenuItem[];
  acceleratorDescriptions?: Record<string, string>; // <[combo in One+Two+Key format], description>
  helpArticle?: ArticlePath | string;
}

export type AppMutator = ReadableStore<App>;
export type AppSpawnResult =
  | "success"
  | "err_elevation"
  | "err_parentNoExist"
  | "err_noExist"
  | "err_spawnCondition"
  | "err_disabled"
  | "err_aboveLimit";

export interface WindowControls {
  minimize: boolean;
  maximize: boolean;
  close: boolean;
}

export interface WindowControlOption {
  caption: string;
  author: string;
  content: any;
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
  noCloseAccelerator?: boolean;
}

export interface AppState {
  minimized: boolean;
  maximized: boolean;
  headless: boolean;
  fullscreen: boolean;
  resizable: boolean;
  snapping?: boolean;
  snapState?: SnapState;
}

export type SnapState =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right";

export type AppLibrary = ReadableStore<Map<string, App>>; // [id, instance]
export type Coordinate = { x: number; y: number };
export type Size = { w: number; h: number };

export interface ContextMenuItem {
  sep?: boolean;
  caption?: string;
  icon?: string;
  image?: string;
  isActive?: ContextMenuCallback<boolean>;
  action?: ContextMenuCallback;
  subItems?: ContextMenuItem[];
  disabled?: ContextMenuCallback<boolean>;
  accelerator?: string;
}

export type ContextMenuCallback<T = void> = (
  window: App,
  data: DOMStringMap,
  scope: string
) => MaybePromise<T>;

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
  artificial?: boolean;
}
