import { MaybePromise } from "./common";

export interface UserDirectory {
  name: string;
  scopedPath: string;
  files: PartialArcFile[];
  directories: PartialUserDir[];
}

export interface PartialUserDir {
  name: string;
  scopedPath: string;
}

export interface PartialArcFile {
  size?: number;
  mime: string;
  filename: string;
  scopedPath: string;
  dateCreated: number;
  dateModified: number;
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
