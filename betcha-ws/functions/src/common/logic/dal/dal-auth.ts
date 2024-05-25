import { getAuth } from "firebase-admin/auth";
import { DbModel } from "../../models/db/db.alias";
import { arrayWith, arrayWithout } from "../../utils/arrays";

export const DEFAULT_CLAIMS: DbModel.AuthClaims = {
    role: 'user',
    groups: []
}

export function getDalAuth() {
    const auth = getAuth();

    async function _setUserClaims(email: string, claims: (src: DbModel.AuthClaims) => Partial<DbModel.AuthClaims>) {
        const authUser = await auth.getUserByEmail(email);
        const sourceClaims = (authUser.customClaims as DbModel.AuthClaims) || DEFAULT_CLAIMS;
        const targetClaims = { ...sourceClaims, ...claims(sourceClaims) };
        await auth.setCustomUserClaims(authUser.uid, targetClaims);
    }

    async function _setUserRole(email: string, role: DbModel.UserRole) {
        await _setUserClaims(email, _ => ({ role }));
    }

    async function _addUserToGroup(email: string, group: string) {
        await _setUserClaims(email, claims => ({ groups: arrayWith(claims.groups, group) }));
    }

    async function _removeUserFromGroup(email: string, group: string) {
        await _setUserClaims(email, claims => ({ groups: arrayWithout(claims.groups, group) }));
    }

    return {
        setUserRole: _setUserRole,
        addUserToGroup: _addUserToGroup,
        removeUserFromGroup: _removeUserFromGroup
    }



}