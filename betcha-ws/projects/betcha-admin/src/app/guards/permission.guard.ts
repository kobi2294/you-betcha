import { inject } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore, PermissionSlice, filterNotNull } from "@lib";
import { DbModel } from "@tscommon";
import { firstValueFrom } from "rxjs";

export function roleGuard(role: DbModel.UserRole): CanActivateFn {
    return async () => {
        const router = inject(Router);
        const claims = await getClaims();
        const isOk = hasRole(claims.role, role);
        if (isOk) return true;
        return router.parseUrl('/home');
    }
}

export function permissionGuard(premission: (p: PermissionSlice) => boolean): CanActivateFn {
    return async () => {
        const auth = inject(AuthStore);
        const router = inject(Router);
        await getClaims();
        const isOk = premission(auth.permissions());
        if (isOk) return true;
        return router.parseUrl('/home');
    }
}

async function getClaims(): Promise<DbModel.AuthClaims> {
    const authStore = inject(AuthStore);
    const claims$ = toObservable(authStore.claims);
    return firstValueFrom(claims$.pipe(filterNotNull())) 
}


function hasRole(has: DbModel.UserRole | null, required: DbModel.UserRole): boolean {
    if (has === null) return false;
    if (has === 'super') return true;
    if (required === 'super') return false;
    if (has === 'trustee') return true;
    if (required === 'trustee') return false;
    return true;
}