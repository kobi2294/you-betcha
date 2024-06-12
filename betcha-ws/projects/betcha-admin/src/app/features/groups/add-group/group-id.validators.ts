import { inject } from '@angular/core';
import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
import { ApiService } from '@lib';
import { catchError, map, of } from 'rxjs';

export function doesNotStartWithLetter(): ValidatorFn {
  return (control) => {
    const value = control.value as string;
    if (!value) return null;

    if (!/^[a-z]/.test(value)) return { doesNotStartWithLetter: true };
    return null;
  };
}

export function isIdFree(): AsyncValidatorFn {
  const api = inject(ApiService);
  return (control) => {
    const value = control.value as string;
    if (!value) return of(null);

    return api.isGroupIdFree(value).pipe(
      map(isFree => (isFree ? null : { isIdFree: true })),
      catchError(() => of(null))
    );
  };
}
