import { appGroups, appLibrary } from "$ts/stores/apps";
import { CompiledAppGroupStore } from "$types/groups";
import { isPopulatable } from "./utils";

export function getAppGroups(): {
  groups: CompiledAppGroupStore;
  rest: string[];
} {
  const library = appLibrary.get();
  const entries = Object.entries(library).map(([id, app]) => { return { ...app, id } })
  const grouped = [];

  let result: CompiledAppGroupStore = {};
  let rest = [];

  for (let i = 0; i < entries.length; i++) {
    rest.push(entries[i].id);
    const group = entries[i].metadata.appGroup;

    if (!appGroups[group]) continue;

    if (!isPopulatable(entries[i])) {
      grouped.push(entries[i].id);

      continue;
    }

    grouped.push(entries[i].id);

    if (!result[group]) {
      result[group] = { ...appGroups[group], apps: [entries[i].id] };

      continue;
    }

    result[group].apps.push(entries[i].id);
  }

  rest = rest.filter((a) => !grouped.includes(a));

  result = Object.fromEntries(
    Object.entries(result).map((g) => {
      g[1].apps = g[1].apps.sort((a, b) => {
        const appA = library[a];
        const appB = library[b];

        return appA.metadata.name > appB.metadata.name ? 1 : -1;
      });

      return g;
    })
  ) as CompiledAppGroupStore;

  return { groups: result, rest };
}
