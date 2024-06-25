import { Cache } from "$ts/cache";
import { Store } from "$ts/writable";
import { AllUsers, UserData } from "$types/user";

export const defaultUserData: UserData = {
  sh: {
    taskbar: {
      centered: false,
      labels: false,
      pos: "",
      docked: false,
      colored: false,
      isLauncher: false,
      clockSecs: false,
      clockDate: false,
      clock12hr: false,
      accentedStart: false,
    },
    window: {
      bigtb: true,
      lefttb: false,
      buttons: "default",
      centertb: false,
    },
    desktop: {
      wallpaper: "img04",
      icons: true,
      theme: "dark",
      sharp: false,
      accent: "a8dadc",
      pinnedApps: [],
      pinnedFiles: [],
      pinnedFolders: [],
      noCustomCursor: false,
      noIconGrid: false,
      lockIcons: false,
    },
    start: {
      small: true,
      noGroups: false,
    },
    anim: true,
    noGlass: false,
    compactContext: false,
    showHiddenApps: false,
    securityNoPassword: false,
    elevationDisabled: false,
    bypassElevation: false,
    enableUserStyle: false,
  },
  disabledApps: [],
  autoLoads: [],
  autoRun: [],
  askPresist: true,
  acc: {
    admin: false,
    enabled: true,
    profilePicture: 3,
  },
  volume: {
    level: 1,
    muted: false,
  },
  appdata: {
    experiments: {},
    ArcShell: {},
    QlorbApp: {},
    LightsOff: {},
    FileManager: {},
    ArcTerm: {},
    SettingsApp: {},
    AppInfo: {},
    LoggerApp: {},
    ErrorDialog: {},
    ProcessManager: {},
    SecureContext: {},
    ServiceInfo: {},
    ExitApp: {},
    TextEditor: {},
    LoadSaveDialog: {},
    desktopWallpaper: {},
  },
  shortcuts: [],
};
export const UserName = Store<string>();
export const UserDataStore = Store<UserData>(defaultUserData);
export const UserToken = Store<string>();
export const UserCache = new Cache<AllUsers>("UserCache", {});
