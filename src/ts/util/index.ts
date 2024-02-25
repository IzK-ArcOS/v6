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
