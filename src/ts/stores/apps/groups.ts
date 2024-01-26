import { AppGroupStore } from "$types/groups";

export const appGroups: AppGroupStore = {
  internal: {
    name: "%internal%", // Hidden applications only called programmatically
    id: "internal",
    index: 0,
  },
  coreApps: {
    name: "Core Apps", // `App.metadata.core` enabled apps (wallpaper, shell)
    id: "coreApps",
    index: 1,
  },
  utilities: {
    name: "Utilities", // Everyday office utilities
    id: "utilities",
    index: 2,
  },
  entertainment: {
    name: "Entertainment", // Games, media player, etc
    id: "entertainment",
    index: 3,
  },
  communication: {
    name: "Communication", // Communication with other people (messaging)
    id: "communication",
    index: 4,
  },
  support: {
    name: "Help and Support", // Tools used for help and support
    id: "support",
    index: 5,
  },
  systemTools: {
    name: "System Tools", // Tools used to manage ArcOS
    id: "systemTools",
    index: 6,
  },
};
