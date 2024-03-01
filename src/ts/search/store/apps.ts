import { spawnApp } from "$ts/apps";
import { isPopulatable } from "$ts/apps/utils/checks";
import { appLibrary } from "$ts/stores/apps";
import { SearchItem } from "$types/search";

export function compileSearchableApps(): SearchItem[] {
  const result: SearchItem[] = [];

  const library = appLibrary.get();

  for (const [id, app] of [...library]) {
    if (!isPopulatable(app)) continue;

    result.push({
      caption: app.metadata.name,
      description: app.metadata.description,
      image: app.metadata.icon,
      action: () => {
        spawnApp(id);
      },
    });
  }

  return result;
}
