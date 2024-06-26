import { OperatorFunction, scan } from 'rxjs';
import { filterNotNull } from './filter-not-null';

export function repeatNotNull<T>(): OperatorFunction<T | null, T> {
  return (source) =>
    source.pipe(
      scan((acc, value) => (value !== null ? value : acc), null as T | null),
      filterNotNull()
    );
}
