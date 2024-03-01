import { restart, shutdown } from "$state/Desktop/ts/power";
import { ShutdownIcon } from "$ts/images/power";
import { SearchItem } from "$types/search";
import { compileSearchableApps } from "./store/apps";
import { compileSearchableFiles } from "./store/files";
import { compileSearchableSettingsPages } from "./store/settings";

const searchProviders = [
  compileSearchableApps,
  compileSearchableSettingsPages,
  compileSearchableFiles,
];

const powerOptions: SearchItem[] = [
  {
    caption: "Shutdown",
    description: "Leave the desktop and turn off ArcOS",
    action: shutdown,
    image: ShutdownIcon,
  },
  {
    caption: "Restart",
    description: "Leave the desktop and reload ArcOS",
    action: () => restart(),
    image: ShutdownIcon,
  },
];

export async function getSearchItems(): Promise<SearchItem[]> {
  let result: SearchItem[] = [...powerOptions];

  for (let i = 0; i < searchProviders.length; i++) {
    result.push(...(await searchProviders[i]()));
  }

  return result;
}
