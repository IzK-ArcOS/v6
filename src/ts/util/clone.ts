export function cloneWithoutInheritance<T>(obj: T): T {
  // Helper function to determine if a value is an object
  const isObject = (value: any): value is object => value && typeof value === "object";

  // Recursive function to clone objects without inheritance
  const deepClone = (value: any): any => {
    if (!isObject(value)) return value;

    if (Array.isArray(value)) {
      return value.map(deepClone);
    }

    const newObj = Object.create(null);
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        newObj[key] = deepClone(value[key]);
      }
    }
    return newObj;
  };

  return deepClone(obj);
}
