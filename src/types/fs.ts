import { MaybePromise, Nullable } from "./common";

export interface UserDirectory {
  name: string;
  scopedPath: string;
  files: PartialArcFile[];
  directories: PartialUserDir[];
  hidden?: boolean;
  virtual?: boolean;
  system?: boolean;
}

export interface PartialUserDir {
  name: string;
  scopedPath: string;
  virtual?: boolean;
  hidden?: boolean;
  system?: boolean;
}

export interface PartialArcFile {
  size?: number;
  mime: string;
  filename: string;
  scopedPath: string;
  dateCreated: number;
  dateModified: number;
  virtual?: boolean;
  hidden?: boolean;
  system?: boolean;
}

export interface ArcFile {
  name: string;
  path: string;
  data: Blob;
  mime: string;
  anymime?: boolean;
}

export interface FSQuota {
  username: string;
  max: number;
  free: number;
  used: number;
}

export interface FileHandler {
  extensions: string[];
  name: string;
  description: string;
  image: string;
  handler: (file: PartialArcFile) => MaybePromise<void>;
}

export interface VirtualDirectory {
  userPath: string;
  data: UserDirectory;
}

export type VirtualFsStoreNode = { callback: VirtualDirectorySupplier; caption: string };

export type VirtualDirectorySupplierReturn = Nullable<VirtualDirectory>[];
export type VirtualDirectorySupplier = () => MaybePromise<VirtualDirectorySupplierReturn>;
