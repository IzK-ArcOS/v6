import { Store } from "$ts/writable";

export const LogStack = Store<string[]>([]);

export function pushToStack(source: string): number {
  LogStack.update((v) => {
    const previous = v[v.length - 1];

    if (previous == source) return v;

    v.push(source);

    return v;
  });

  return LogStack.get().length;
}

export function compileStackString(): string {
  const stack = LogStack.get().reverse();

  let str = "";

  for (let i = 0; i < stack.length; i++) {
    if (stack[i] == "ArcOS") continue;

    str += `  at [ArcOS] ${stack[i]}\n`;
  }

  return str;
}
