import { KnownAcceleratorKeys } from "$ts/stores/apps/accelerators";

export function splitAcceleratorString(accelerator: string): string[] {
  const result = [];
  const split = accelerator.split("+");

  for (let i = 0; i < split.length; i++) {
    const segment = split[i];

    if (!KnownAcceleratorKeys.includes(segment)) continue;

    result.push(segment);
    if (i + 1 != split.length) result.push("+");
  }

  return result;
}