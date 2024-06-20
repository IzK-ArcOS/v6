export function stringifyObject(obj: any, indent: number = 2): string {
  const space = " ".repeat(indent);

  const stringify = (value: any, level: number): string => {
    const currentIndent = space.repeat(level);
    const nextIndent = space.repeat(level + 1);

    if (value === null) {
      return "null";
    } else if (value === undefined) {
      return "undefined";
    } else if (typeof value === "number" || typeof value === "boolean") {
      return value.toString();
    } else if (typeof value === "string") {
      return JSON.stringify(value); // Handles escaping properly
    } else if (typeof value === "function") {
      return value.toString();
    } else if (typeof value === "object") {
      if (Array.isArray(value)) {
        const arrayItems = value
          .map((item) => `${nextIndent}${stringify(item, level + 1)}`)
          .join(",\n");
        return `[\n${arrayItems}\n${currentIndent}]`;
      } else {
        const entries = Object.entries(value)
          .map(([key, val]) => `${nextIndent}${JSON.stringify(key)}: ${stringify(val, level + 1)}`)
          .join(",\n");
        return `{\n${entries}\n${currentIndent}}`;
      }
    }
    throw new TypeError(`Unsupported type: ${typeof value}`);
  };

  return stringify(obj, 0);
}
