export const sizeUnits = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

/**
 * Formats the incoming bytes to a human-readable format
 * @param bytes The bytes to format
 * @returns The formatted size
 */
export function formatBytes(bytes: number) {
  let l = 0,
    n = bytes;

  while (n >= 1024 && ++l) {
    n = n / 1024;
  }

  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + sizeUnits[l];
}
