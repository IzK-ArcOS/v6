import { ArticlePath } from "$apps/HelpSupport/ts/types";

export const HelpArticles: Record<string, ArticlePath> = {
  home: `@client/help/Home.md`,
  settings: `@client/help/Settings.md`,
  settingsAccount: `@client/help/Settings/account.md`,
  settingsThemes: `@client/help/Settings/themes.md`,
  settingsWallpaper: `@client/help/Settings/wallpaper.md`,
  contact: `@client/help/Contact.md`,
  debug: `@client/help/Debug.md`,
  $unfinished: `@client/help/$unfinished.md`
};