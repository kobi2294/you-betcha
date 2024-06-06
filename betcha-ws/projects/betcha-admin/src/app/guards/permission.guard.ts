import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthStore, PermissionSlice } from "@lib";
import { DbModel } from "@tscommon";

export function roleGuard(role: DbModel.UserRole): CanActivateFn {
    return () => {
        const router = inject(Router);
        const auth = inject(AuthStore);
        const isOk = hasRole(auth.claims()?.role ?? null, role);
        if (isOk) return true;
        return router.parseUrl('/home');
    }
}

export function permissionGuard(premission: (p: PermissionSlice) => boolean): CanActivateFn {
    return () => {
        const router = inject(Router);
        const auth = inject(AuthStore);
        const isOk = premission(auth.permissions());
        if (isOk) return true;
        return router.parseUrl('/home');
    }
}


function hasRole(has: DbModel.UserRole | null, required: DbModel.UserRole): boolean {
    if (has === null) return false;
    if (has === 'super') return true;
    if (required === 'super') return false;
    if (has === 'trustee') return true;
    if (required === 'trustee') return false;
    return true;
}