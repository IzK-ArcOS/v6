import { AppGroupStore } from "$types/groups";

export const appGroups: AppGroupStore = {
  communication: {
    name: "Communication", // Communication with other people (messaging)
    id: "communication",
  },
  coreApps: {
    name: "Core Apps", // `App.metadata.core` enabled apps (wallpaper, shell)
    id: "coreApps",
  },
  entertainment: {
    name: "Entertainment", // Games, media player, etc
    id: "entertainment",
  },
  utilities: {
    name: "Utilities", // Everyday office utilities
    id: "utilities",
  },
  support: {
    name: "Help and Support", // Tools used for help and support
    id: "support",
  },
  systemTools: {
    name: "System Tools", // Tools used to manage ArcOS
    id: "systemTools",
  },
  internal: {
    name: "%internal%", // Hidden applications only called programmatically
    id: "internal",
  },
};
