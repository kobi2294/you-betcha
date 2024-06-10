import { Auth, User } from "@angular/fire/auth";
import { DbModel } from "@tscommon";
import { PermissionSlice } from "./auth.slice";
import { Observable, combineLatest, from, of } from "rxjs";
import { QueryService } from "../services/query.service";

export async function claimsFromUser(user: User): Promise<DbModel.AuthClaims> {
    await user.reload();
    const token = await user.getIdTokenResult(true);
    return {
        adminGroups: token.claims['adminGroups'] as string[] || [],
        role: token.claims['role'] as DbModel.UserRole || 'user', 
        userGroups: token.claims['userGroups'] as string[] || []
    }
}

export function observeAuthStateChange(afAuth: Auth): Observable<User | null> {
    return new Observable(subscriber => {
        const unsubscribe = afAuth.onAuthStateChanged(subscriber);
        return unsubscribe;
    });
}

export interface UserDetails {
    user: DbModel.User | null;
    claims: DbModel.AuthClaims | null;
}

export function getUserDetails(fireUser: User | null, query: QueryService): Observable<UserDetails> {
    if (fireUser === null) {
        return of({user: null, claims: null});
    }

    return combineLatest({
        user: query.getUser(fireUser.email!),
        claims: from(claimsFromUser(fireUser))
    })    
}


export function canAccessAdminApp(claims: DbModel.AuthClaims | null): boolean {
    if (!claims) return false;

    return claims.role === 'trustee' 
        || claims.role === 'super' 
        || claims.adminGroups.length > 0;
}

export function isInProgress(fireuser: User | null | undefined, user: DbModel.User | null, claims: DbModel.AuthClaims | null): boolean {
    if (fireuser === undefined) return true;
    if (fireuser === null) return false;
    if (!user || !claims) return true;
    return false;
}

export function permissions(claims: DbModel.AuthClaims | null): PermissionSlice {
    if (claims === null) return {
        canManageGroups: false,
        canManageUsers: false,
        canManageMatches: false,
        canManageMetadata: false
    }

    if (claims.role === 'super') return {
        canManageGroups: true,
        canManageUsers: true,
        canManageMatches: true,
        canManageMetadata: true
    }

    return {
        canManageGroups: claims.adminGroups.length > 0,
        canManageUsers: false,
        canManageMatches: claims.role === 'trustee', 
        canManageMetadata: false
    }
}
