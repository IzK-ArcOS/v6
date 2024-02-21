export const sleep = (m: number = 0) => new Promise((r) => setTimeout(r, m));

export const Plural = (s: string, x: number) => `${s}${x == 1 ? "" : "s"}`;

export function CountInstances(input: string, search: string) {
  return input.split(search).length;
}
