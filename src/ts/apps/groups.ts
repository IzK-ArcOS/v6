import { appGroups, appLibrary } from "$ts/stores/apps";
import { CompiledAppGroupStore } from "$types/groups";
import { isPopulatable } from "./utils";

export function getAppGroups(): {
  groups: CompiledAppGroupStore;
  rest: string[];
} {
  const library = appLibrary.get();
  /* const entries = Object.entries(library).map(([id, app]) => { return { ...app, id } }) */
  const grouped = [];

  let result: CompiledAppGroupStore = {};
  let rest = [];

  for (const [id, app] of library) {
    rest.push(id);
    const group = app.metadata.appGroup;

    if (!appGroups[group]) continue;

    if (!isPopulatable(app)) {
      grouped.push(id);

      continue;
    }

    grouped.push(id);

    if (!result[group]) {
      result[group] = { ...appGroups[group], apps: [id] };

      continue;
    }

    result[group].apps.push(id);
  }

  rest = rest.filter((a) => !grouped.includes(a));

  result = Object.fromEntries(
    Object.entries(result).map((g) => {
      g[1].apps = g[1].apps.sort((a, b) => {
        const appA = library.get(a);
        const appB = library.get(b);

        console.log(a, b)

        return appA.metadata.name > appB.metadata.name ? 1 : -1;
      });

      return g;
    })
  ) as CompiledAppGroupStore;

  return { groups: result, rest };
}
