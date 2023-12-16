import { AppGroupStore } from "$types/groups";

export const appGroups: AppGroupStore = {
  communication: {
    name: "Communication",
    id: "communication",
  },
  coreApps: {
    name: "Core Apps",
    id: "coreApps",
  },
  entertainment: {
    name: "Entertainment",
    id: "entertainment",
  },
  utilities: {
    name: "Utilities",
    id: "utilities",
  },
  support: {
    name: "Help and Support",
    id: "support",
  },
  systemTools: {
    name: "System Tools",
    id: "systemTools",
  },
  internal: {
    name: "Internal Tools",
    id: "internal"
  }
};
