export function toRecord<T>(items: T[], keySelector: (t: T) => string): Record<string, T>;
export function toRecord<T>(items: T[], keySelector: (t: T) => number): Record<number, T>;
export function toRecord<T>(items: T[], keySelector: ((t: T) => string) | ((t: T) => number)): Record<string, T> | Record<number, T> {
  const pairs = items.map((item) => [keySelector(item), item] as const);
  return Object.fromEntries(pairs);
}

export function groupBy<T>(items: T[], keySelector: (t: T) => string): Record<string, T[]>;
export function groupBy<T>(items: T[], keySelector: (t: T) => number): Record<number, T[]>;
export function groupBy<T>(items: T[], keySelector: ((t: T) => string) | ((t: T) => number)): Record<string, T[]> | Record<number, T[]> {
  return items.reduce((groups, item) => {
    (groups[keySelector(item)] ||= []).push(item);
    return groups;
  }, {} as (Record<number | string, T[]>));
}

export function groupToArray<T>(items: T[], keySelector: (t: T) => string): Array<[string, T[]]>;
export function groupToArray<T>(items: T[], keySelector: (t: T) => number): Array<[number, T[]]>;
export function groupToArray<T>(items: T[], keySelector: ((t: T) => string) | ((t: T) => number)): Array<[string, T[]]> | Array<[number, T[]]> {
  const map = new Map<string | number, T[]>();

  for (const item of items) {
    const key = keySelector(item);
    const group = map.get(key) || [];
    group.push(item);
    map.set(key, group);
  }

    return [...map.entries()] as Array<[string, T[]]> | Array<[number, T[]]>
}

