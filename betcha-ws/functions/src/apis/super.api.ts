import { AuthToken, authorize } from "../common/api/authorize"
import { getDal } from "../common/logic/dal/dal";
import { DbModel } from "../common/models/db/db.alias";
import { arrayWithout } from "../common/utils/arrays";
import { getDalAuth } from "../common/logic/dal/dal-auth";

export function getSuperApi(authData: AuthToken) {
    authorize(authData, 'super');
    const dal = getDal();

    async function _createGroup(id: string, displayName: string) {
        const group: DbModel.Group = {
            id,
            displayName,
            secret: Math.random().toString(10).substring(2, 12),
            blocked: false,
            latestMessage: '', 
            latestMessagePhotoUrl: '', 
            photoUrl: '', 
            theme: 'blue', 
            usersLimit: 25
        };

        const calcGroup: DbModel.CalculatedGroup = {
            id, 
            matchScores: []
        }

        await Promise.all([
            dal.groups.saveOne(group),
            dal.calculatedGroups.saveOne(calcGroup)
        ]);
    }

    async function _deleteGroup(id: string) {
        await Promise.all([
            dal.groups.deleteOne(id),
            dal.groups.deleteOne(id)            
        ]);

        const users = await dal.users.getAll(['groups', 'array-contains', id]);
        const updatedUsers = users.map(user => ({...user, groups: arrayWithout(user.groups, id)}));
    
        const batch = dal.batch();
        batch.setMany('users', updatedUsers);

        const dalAuth = getDalAuth();
        await Promise.all(users.map(user => dalAuth.removeUserFromGroup(user.id, id)));
    }

    




    return {
        createGroup: _createGroup,
        deleteGroup: _deleteGroup
    }
}