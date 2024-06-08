import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

export function filterNotNull<T>(): OperatorFunction<T | null | undefined, T> {
    return source => source.pipe(
        filter((value): value is T => value !== null && value !== undefined)
    );
}