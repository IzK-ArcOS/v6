import { appLibrary } from "$ts/stores/apps";

export function appDependenciesMatch(deps: string[]): boolean {
  const apps = [...appLibrary.get()].map((a) => a[1].id);

  for (const dep of deps) {
    if (!apps.includes(dep)) return false;
  }

  return true;
}
