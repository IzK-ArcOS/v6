export function getJsonHierarchy<T = any>(object: Object, hierarchy: string): T | null {
  const parts = hierarchy.split(".");

  let currentObj = object;

  for (const part of parts) {
    if (!currentObj[part]) return null;

    currentObj = currentObj[part];
  }

  return currentObj as T;
}

export function setJsonHierarchy<T = any>(object: Object, hierarchy: string, value: T): T {
  const parts = hierarchy.split(".");
  const lastIndex = parts.length - 1;

  let currentObj = object;

  for (let i = 0; i < lastIndex; i++) {
    const key = parts[i];

    if (currentObj[key] === undefined) {
      currentObj[key] = {};
    }

    currentObj = currentObj[key];
  }

  if (value === null) delete currentObj[parts[lastIndex]];
  else currentObj[parts[lastIndex]] = value;

  return getJsonHierarchy(object, hierarchy);
}
