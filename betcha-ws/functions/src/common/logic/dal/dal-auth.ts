import { getAuth } from "firebase-admin/auth";
import { DbModel } from "../../models/db/db.alias"
import { arrayWith, arrayWithout } from "../../utils/arrays";

export const DEFAULT_CLAIMS: DbModel.AuthClaims = {
    role: 'user',
    userGroups: [], 
    adminGroups: []
}

export function getDalAuth() {
    const auth = getAuth();

    async function _setUserClaims(email: string, claims: (src: DbModel.AuthClaims) => Partial<DbModel.AuthClaims>) {
        const authUser = await auth.getUserByEmail(email);
        const sourceClaims = (authUser.customClaims as DbModel.AuthClaims) || DEFAULT_CLAIMS;
        const targetClaims = { ...sourceClaims, ...claims(sourceClaims) };
        await auth.setCustomUserClaims(authUser.uid, targetClaims);
    }

    async function _addUserToGroup(email: string, group: string) {
        await _setUserClaims(email, claims => ({ userGroups: arrayWith(claims.userGroups, group) }));
    }

    async function _removeUserFromGroup(email: string, group: string) {
        await _setUserClaims(email, claims => ({ userGroups: arrayWithout(claims.userGroups, group) }));
    }

    async function _addAdminToGroup(email: string, group: string) {
        await _setUserClaims(email, claims => ({ adminGroups: arrayWith(claims.adminGroups, group) }));
    }

    async function _removeAdminFromGroup(email: string, group: string) {
        await _setUserClaims(email, claims => ({ adminGroups: arrayWithout(claims.adminGroups, group) }));
    }

    async function _setRole(email: string, role: DbModel.UserRole) {
        await _setUserClaims(email, claims => ({ role }));
    }

    return {
        setUserClaims: _setUserClaims,
        addUserToGroup: _addUserToGroup,
        removeUserFromGroup: _removeUserFromGroup, 
        addAdminToGroup: _addAdminToGroup,
        removeAdminFromGroup: _removeAdminFromGroup,
        setRole: _setRole, 
    }



}