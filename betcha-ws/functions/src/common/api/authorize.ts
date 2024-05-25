import { AuthData } from "firebase-functions/lib/common/providers/https";
import { HttpsError } from "firebase-functions/v2/https"
import { DbModel } from "../models/db/db.alias";
import { isRoleSufficient } from "../models/db/enums.model";

export function authorize(auth: AuthData | undefined, role: DbModel.UserRole, group: string = ''): DbModel.UserAuth {
    if (!auth) {
        throw unauthenticated();
    }

    const userRole = (auth.token.role || 'user') as DbModel.UserRole;
    const userGroups = (auth.token.groups || []) as string[];

    if (!isRoleSufficient(role, userRole)) {
        throw forbidden();
    }

    if (group && !userGroups.includes(group)) {  
        throw forbidden();
    }

    return {
        id: auth.uid,
        email: auth.token.email!,
        role: userRole,
        groups: userGroups    
    }
}

export function unauthenticated(msg: string = 'Unauthorized') {
    return new HttpsError('unauthenticated', msg);
}

export function forbidden(msg: string = 'Forbidden') {
    return new HttpsError('permission-denied', msg);
}


export function notFound(msg: string = 'Not found') {
    return new HttpsError('not-found', msg);
}

export function badRequest(msg: string = 'Bad request') {
    return new HttpsError('unavailable', msg);
}