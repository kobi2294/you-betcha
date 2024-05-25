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

