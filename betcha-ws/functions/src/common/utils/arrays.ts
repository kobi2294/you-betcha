export function bufferCount<T>(items: T[], buffer: number): T[][] {
  return Array.from({length: Math.ceil(items.length / buffer)}, (_, i) =>
    items.slice(i * buffer, i * buffer + buffer)
  );
}

export function arrayWith<T>(source: T[], item: T): T[] {
  if (source.includes(item)) return source;
  return [...source, item];
}

export function arrayWithout<T>(source: T[], item: T): T[] {
  return source.filter(i => i !== item);
}

export function arrayContentEquals<T>(a: T[], b: T[]): boolean {
  // check that they have the same items, not neccearily in the same order
  // use a set for performance

  const setA = new Set(a);
  const setB = new Set(b);

  if (setA.size !== setB.size) return false;

  for (let item of setA) {
    if (!setB.has(item)) return false;
  }

  return true;

}

