export function bufferCount<T>(items: T[], buffer: number): T[][] {
  return Array.from({length: Math.ceil(items.length / buffer)}, (_, i) =>
    items.slice(i * buffer, i * buffer + buffer)
  );
}

