import { Log } from "$ts/console";
import { BuiltinThemes } from "$ts/stores/themes/builtins";
import { UserThemeKeys } from "$ts/stores/themes/values";
import { UserDataStore, UserName } from "$ts/stores/user";
import { LogLevel } from "$types/console";
import { UserTheme } from "$types/theme";

export function loadTheme(context: UserTheme) {
  const verifier = verifyTheme(context);

  if (verifier !== "themeIsValid") {
    Log("themes", `Not loading invalid theme! Missing ${verifier}`, LogLevel.error);

    return false;
  }

  UserDataStore.update((udata) => {
    udata.sh.anim = !!context.anim;
    udata.sh.noGlass = !!context.noGlass;
    udata.sh.desktop.sharp = !!context.sharp;
    udata.sh.desktop.theme = context.theme;
    udata.sh.desktop.wallpaper = context.wallpaper;
    udata.sh.desktop.accent = context.accent;
    udata.sh.taskbar.docked = !!context.docked;
    udata.sh.taskbar.centered = !!context.taskbarCentered;
    udata.sh.taskbar.labels = !!context.taskbarLabels;
    udata.sh.taskbar.pos = context.taskbarPosition;
    udata.sh.start.small = !!context.smallStart;
    udata.sh.window.buttons = context.titleButtons;
    udata.sh.window.bigtb = !!context.titlebarLarge;
    udata.sh.window.lefttb = !!context.titlebarLeft;
    udata.sh.taskbar.colored = !!context.taskbarColored;
    udata.sh.window.centertb = !!context.titlebarCentered;
    udata.sh.taskbar.isLauncher = !!context.isLauncher;
    udata.sh.userStyle = context.userStyle || "";

    if (context.loginBackground) udata.acc.loginBackground = context.loginBackground;

    return udata;
  });

  return true;
}

export function saveCurrentTheme(name: string) {
  const id = `${Math.floor(Math.random() * 1e6)}`;

  UserDataStore.update((udata) => {
    const context: UserTheme = {
      version: "1.0",
      name,
      author: UserName.get(),
      anim: udata.sh.anim,
      noGlass: udata.sh.noGlass,
      sharp: udata.sh.desktop.sharp,
      theme: udata.sh.desktop.theme,
      wallpaper: udata.sh.desktop.wallpaper,
      loginBackground: udata.acc.loginBackground || "img15",
      accent: udata.sh.desktop.accent,
      docked: udata.sh.taskbar.docked,
      taskbarCentered: udata.sh.taskbar.centered,
      taskbarLabels: udata.sh.taskbar.labels,
      taskbarPosition: udata.sh.taskbar.pos,
      smallStart: udata.sh.start.small,
      titleButtons: udata.sh.window.buttons,
      titlebarLarge: udata.sh.window.bigtb,
      titlebarLeft: udata.sh.window.lefttb,
      taskbarColored: udata.sh.taskbar.colored,
      titlebarCentered: udata.sh.window.centertb,
      isLauncher: udata.sh.taskbar.isLauncher,
      userStyle: udata.sh.userStyle,
    };

    if (!udata.sh.userThemes) udata.sh.userThemes = {};

    udata.sh.userThemes[id] = context;

    return udata;
  });
}

export function deleteCustomTheme(id: string) {
  Log("themes", `Deleting UserTheme "${id}"`);

  UserDataStore.update((udata) => {
    if (!udata.sh.userThemes || !udata.sh.userThemes[id]) return udata;

    delete udata.sh.userThemes[id];

    return udata;
  });

  return true;
}

export function verifyTheme(json: object) {
  const keys = Object.keys(json);

  for (const key of UserThemeKeys) {
    if (!keys.includes(key)) return key;
  }

  return "themeIsValid";
}

export function applyUserTheme(id: string) {
  Log("themes", `Applying UserTheme "${id}"`);

  if (!id) return;

  const udata = UserDataStore.get();
  const themes = udata.sh.userThemes;

  if (!themes || !themes[id]) return false;

  loadTheme(themes[id]);

  return true;
}

export function applySystemTheme(id: string) {
  Log("themes", `Applying Built-in theme "${id}"`);

  if (!id || !BuiltinThemes[id]) return;

  loadTheme(BuiltinThemes[id]);

  return true;
}
