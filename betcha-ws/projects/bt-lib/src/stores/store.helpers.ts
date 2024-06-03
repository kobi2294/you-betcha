import { User } from "@angular/fire/auth";
import { DbModel } from "@tscommon";

export async function claimsFromUser(user: User): Promise<DbModel.AuthClaims> {
    await user.reload();
    const token = await user.getIdTokenResult(true);
    console.log('token for user', user.email, token);
    return {
        adminGroups: token.claims['adminGroups'] as string[] || [],
        role: token.claims['role'] as DbModel.UserRole || 'user', 
        userGroups: token.claims['userGroups'] as string[] || []
    }
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
