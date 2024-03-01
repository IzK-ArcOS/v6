import { OpenSettingsPage } from "$apps/Settings/ts/main";
import { SettingsStore } from "$apps/Settings/ts/store";
import { SearchItem } from "$types/search";

export function compileSearchableSettingsPages(): SearchItem[] {
  const result: SearchItem[] = [];
  const pages = SettingsStore();

  for (const [id, page] of pages) {
    result.push({
      image: page.image,
      caption: page.name,
      description: "Settings Page",
      action: () => {
        OpenSettingsPage(id);
      },
    });
  }

  return result;
}
