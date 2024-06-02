import { User } from "@angular/fire/auth";
import { DbModel } from "@tscommon";

export async function claimsFromUser(user: User): Promise<DbModel.AuthClaims> {
    const token = await user.getIdTokenResult(true);
    console.log('token for user', user.email, token);
    return {
        adminGroups: token.claims['adminGroups'] as string[] || [],
        role: token.claims['role'] as DbModel.UserRole || 'user', 
        userGroups: token.claims['userGroups'] as string[] || []
    }
}

