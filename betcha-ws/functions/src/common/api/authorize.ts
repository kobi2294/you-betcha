import { HttpsError } from "firebase-functions/v2/https"
import { AuthToken } from "../models/db/user-claims.model";
import { AuthData } from "firebase-functions/lib/common/providers/https";
export type AuthRole = 'super' | 'group-admin' | 'user' | 'trustee';
export type SuperOverride = { isSuperOveride: true, data: AuthData | undefined | null };

export type MaybeAuthData = AuthData | SuperOverride | null | undefined;

function isSuperOverride(data: MaybeAuthData): data is SuperOverride {
    return (!!data) && (data as SuperOverride).isSuperOveride;
}

function tokenize(data: AuthData | SuperOverride): AuthToken {
    if (isSuperOverride(data)) {
        return {
            id: data.data?.uid || '',
            email: data.data?.token.email || '',
            role: 'super',
            userGroups: data.data?.token.userGroups || [],
            adminGroups: data.data?.token.adminGroups || [],
        };
    }

    return {
        id: data.uid,
        email: data.token.email || '',
        role: data.token.role || 'user',
        userGroups: data.token.userGroups || [],
        adminGroups: data.token.adminGroups || [],
    };
}


function authorize(data: MaybeAuthData, role: 'super'): AuthToken
function authorize(data: MaybeAuthData, role: 'group-admin', group: string): AuthToken
function authorize(data: MaybeAuthData, role: 'user', group: string): AuthToken
function authorize(data: MaybeAuthData, role: 'user'): AuthToken
function authorize(data: MaybeAuthData, role: 'trustee'): AuthToken
function authorize(data: MaybeAuthData, role: AuthRole, group?: string): AuthToken {
    if (!data) {
        throw unauthenticated();
    }

    const token = tokenize(data);

    // super is allowed anything
    if (token.role === 'super') {
        return token;
    }

    // trustee is allowed only trustee
    if (role === 'trustee') {
        if (token.role === 'trustee') {
            return token;
        }
        throw forbidden();
    }
    
    // admin is allowed for group is the adminGroups includes the group
    if (role === 'group-admin') {
        if (group && token.adminGroups.includes(group)) {
            return token;
        }
    }

    // user can be tested for group, or generaly. If the user is tested generally, it's always allowed, 
    // otherwise its allowed only if the userGroups includes the group
    if (role === 'user') {
        if ((!group) || (token.userGroups.includes(group))) {
            return token;
        } else {
            throw forbidden();
        }
    }

    // we should never get here, but if we do, it's forbidden
    throw forbidden();
}

authorize.upgrateToSuper = (token: MaybeAuthData): SuperOverride => {
    if (isSuperOverride(token)) {
        return token;
    }

    return { isSuperOveride: true, data: token };
};

export { authorize };

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