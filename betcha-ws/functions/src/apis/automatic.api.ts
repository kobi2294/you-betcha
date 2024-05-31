import { MaybeAuthData, authorize } from "../common/api/authorize";
import { getDal } from "../common/logic/dal/dal";
import { getDalAuth } from "../common/logic/dal/dal-auth";

export function getAutomaticApi(authData: MaybeAuthData) {
    authorize(authData, 'super');
    const dal = getDal();

    // collects all the groups that the user is admin of, and sets it in the user claims
    // this should be called when a user is created to make sure the claims contain all the groups 
    // he was set as an admin of
    async function _collectUserGroupAdmins(email: string) {
        const groups = await dal.groups.getAll(['admins', 'array-contains', email]);
        const groupIds = groups.map(g => g.id);
        const dalAuth = getDalAuth();
        await dalAuth.setUserClaims(email, _ => ({ adminGroups: groupIds }));        
    }

    return {
        collectUserGroupAdmins: _collectUserGroupAdmins
    }
}