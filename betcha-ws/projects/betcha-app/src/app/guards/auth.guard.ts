import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { AuthStore } from "@lib";

export function authGuard(): CanActivateFn {
    return () => {
        const auth = inject(AuthStore);
        return auth.user() !== null;
    }
}

export function inAnyGroupGuard(): CanActivateFn {
    return () => {
        const auth = inject(AuthStore);
        return (auth.user() !== null) && (auth.user()!.groups.length > 0);
    }
}