import { UserDirectory } from "$types/fs";

export * from "./mime";

export const DummyUserDirectory: UserDirectory = {
  scopedPath: undefined,
  name: undefined,
  files: [],
  directories: [],
};
