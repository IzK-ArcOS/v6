import { ItemFlags, UserDirectory } from "$types/fs";

export * from "./mime";

export const DummyUserDirectory: UserDirectory = {
  scopedPath: undefined,
  name: undefined,
  files: [],
  directories: [],
};

export const HardwiredFsItemFlags: Record<string, ItemFlags> = {
  "./Desktop": {
    virtual: true,
    hidden: true,
    system: true,
  },
  Desktop: {
    virtual: true,
    hidden: true,
    system: true,
  },
  ArcOS: {
    virtual: true,
    hidden: true,
    system: true,
  },
  "./ArcOS": {
    virtual: true,
    hidden: true,
    system: true,
  },
};
