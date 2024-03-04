import { Nullable } from "./common";
import { ThemeStore } from "./theme";

export interface UserData {
  sh: {
    taskbar: {
      centered: boolean; // added
      labels: boolean; // added
      pos: "vertical" | "" | "vertical-right" | "top" | string; // added
      docked: boolean; // added
      colored: boolean; // added
      isLauncher: boolean;
      clockSecs: boolean; // added
      clockDate: boolean; // added
      clock12hr: boolean; // added
      accentedStart: boolean; // added
    };

    window: {
      bigtb: boolean; // added
      lefttb: boolean; // added
      buttons: string;
      centertb: boolean; // added
    };

    desktop: {
      wallpaper: string | null; // added
      icons: boolean; // added
      theme: "light" | "dark" | string; // added
      sharp: boolean; // added
      accent: string; // added
      pinnedApps: string[];
      pinnedFolders: string[];
      pinnedFiles: string[];
      noCustomCursor: boolean;
      noIconGrid: boolean; // added
      lockIcons: boolean; // added
    };

    start: {
      small: boolean; // added
      noGroups: boolean; // added
    };

    anim: boolean; // added
    noGlass: boolean; // added
    userThemes?: ThemeStore; // added
    compactContext: boolean; // added
    showHiddenApps?: boolean; // added
    securityNoPassword: boolean; // added
    elevationDisabled: boolean; // added
    bypassElevation: boolean; // halfway
  };

  disabledApps: string[];
  autoRun: string[];
  autoLoads: string[];
  askPresist: boolean;

  acc: AccountInfo;

  volume: {
    level: number;
    muted: boolean;
  };

  security?: SecuritySettings;

  appdata: AppData;
}

interface SecuritySettings {
  bypassElevation?: boolean;
}

interface AccountInfo {
  admin: boolean; // backwards compat, discontinued
  enabled: boolean; // added
  loginBackground?: string; // added
  profilePicture: Nullable<string | number>; // added
  v6?: boolean;
}

export type AppData = {
  experiments: { [key: string]: boolean };
  [key: string]: ScopedAppData;
};

export type ScopedAppData = {
  [key: string]: number | boolean | string | object;
};

export type AllUsers = { [name: string]: UserData };

export interface PartialUser {
  acc: AccountInfo;
  username: string;
}
