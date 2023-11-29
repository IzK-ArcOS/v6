interface UserData {
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
    userThemes?: ThemeStore;
    compactContext: boolean;
    showHiddenApps?: boolean;
  };

  disabledApps: string[];
  autoRun: string[];
  autoLoads: string[];
  askPresist: boolean;

  acc: {
    enabled: boolean;
    admin: boolean;
    profilePicture: string | number | null;
    loginBackground?: string;
  };

  volume: {
    level: number;
    muted: boolean;
  };

  appdata: AppData;
}
