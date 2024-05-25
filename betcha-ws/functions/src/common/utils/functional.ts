export function on<T, R>(source: T, fn: (source: T) => R): R {
  return fn(source);
};