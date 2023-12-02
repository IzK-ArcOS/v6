import { Nullable } from "./common";

export interface UserData {
  sh: {
    taskbar: {
      centered: boolean; //done
      labels: boolean; //done
      pos: "vertical" | "" | "vertical-right" | "top" | string;
      docked: boolean; //done
      colored: boolean;
      isLauncher: boolean;
      clockSecs: boolean;
      clockDate: boolean;
      clock12hr: boolean;
      accentedStart: boolean;
    };

    window: {
      bigtb: boolean; //done
      lefttb: boolean; //done
      buttons: string;
      centertb: boolean;
    };

    desktop: {
      wallpaper: string | null;
      icons: boolean;
      theme: "light" | "dark" | string;
      sharp: boolean;
      accent: string;
      pinnedApps: string[];
      pinnedFolders: string[];
      pinnedFiles: string[];
      noCustomCursor: boolean;
      noIconGrid: boolean;
      lockIcons: boolean;
    };

    start: {
      small: boolean; //done
      noGroups: boolean;
    };

    anim: boolean; //done
    noGlass: boolean; //done
    noQuickSettings: boolean;
    userThemes?: /* ThemeStore */ any; // TODO: ADD THEMESTORE INTERFACES BACK
    compactContext: boolean;
    showHiddenApps?: boolean;
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

  appdata: AppData;
}

interface AccountInfo {
  admin: boolean;
  enabled: boolean;
  loginBackground?: string;
  profilePicture: Nullable<string | number>;
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
