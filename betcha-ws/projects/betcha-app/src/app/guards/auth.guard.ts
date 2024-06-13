import { inject } from "@angular/core";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn } from "@angular/router";
import { AuthStore } from "@lib";
import { filter, firstValueFrom, map, take } from "rxjs";

export function authGuard(): CanActivateFn {
    return () => {
        const auth = inject(AuthStore);
        return auth.user() !== null;
    }
}

export function inAnyGroupGuard(): CanActivateFn {
    return async () => {
        const auth = inject(AuthStore);
        const claims$ = toObservable(auth.claims).pipe(
            filter(claims => claims !== null),
            take(1), 
            takeUntilDestroyed()
        );

        const claims = await firstValueFrom(claims$);
        const res = (auth.claims()?.userGroups ?? []).length > 0;
        return res;
    }
}