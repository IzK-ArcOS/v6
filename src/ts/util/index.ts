export const sleep = (m: number = 0) => new Promise((r) => setTimeout(r, m));

export const Plural = (s: string, x: number) => `${s}${x == 1 ? "" : "s"}`;

export function CountInstances(input: string, search: string) {
  return input.split(search).length;
}

export function Repeat(char: string, amount: number) {
  return char.repeat(amount);
}

export function Longest(...strings: string[]): number {
  let length = 0;

  for (const string of strings) {
    if (string.length > length) length = string.length;
  }

  return length;
}

export function Join(root: string, ...parts: string[]) {
  let result = "";

  if (root.endsWith("/")) root = root.slice(0, -1);

  result += `${root}/`;

  for (let part of parts) {
    if (part.endsWith("/")) part = part.slice(0, -1);

    result += `${part}/`;
  }

  return result.slice(0, -1);
}

export function pathJoin(...paths: string[]): string {
  const separator = "/";
  let resolvedPath = "";

  for (let i = 0; i < paths.length; i++) {
    const segment = paths[i];

    if (!segment || segment.length === 0) {
      continue;
    }

    if (resolvedPath.length === 0) {
      resolvedPath = segment;
    } else {
      if (resolvedPath[resolvedPath.length - 1] === separator) {
        if (segment[0] === separator) {
          resolvedPath += segment.slice(1);
        } else {
          resolvedPath += segment;
        }
      } else {
        if (segment[0] === separator) {
          resolvedPath += segment;
        } else {
          resolvedPath += separator + segment;
        }
      }
    }
  }

  return resolvedPath;
}
