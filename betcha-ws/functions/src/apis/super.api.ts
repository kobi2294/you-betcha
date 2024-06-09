import { MaybeAuthData, authorize, badRequest, notFound } from "../common/api/authorize"
import { getDal } from "../common/logic/dal/dal";
import { DbModel } from "../common/models/db/db.alias";
import { arrayWith, arrayWithout } from "../common/utils/arrays";
import { getDalAuth } from "../common/logic/dal/dal-auth";

export function getSuperApi(authData: MaybeAuthData) {
    authorize(authData, 'super');
    const dal = getDal();

    async function _createGroup(id: string, displayName: string) {
        const existing = await dal.groups.getOne(id);
        if (existing) throw badRequest('Group already exists');

        const group: DbModel.Group = {
            id,
            displayName,
            secret: Math.random().toString(10).substring(2, 12),
            blocked: false,
            message: '',         
            logoUrl: '', 
            theme: 'blue', 
            usersLimit: 25, 
            slogan: '',
            admins: []
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
    async function _addAdminToGroup(email: string, groupId: string) {
        const group = await dal.groups.getOne(groupId);
        if (!group) throw notFound('Group does not exist');

        const groupAdmins = arrayWith(group.admins, email);
        await dal.groups.updateOne(groupId, _ => ({ admins: groupAdmins }));

        const dalAuth = getDalAuth();
        await dalAuth.addAdminToGroup(email, groupId);
    }
    async function _removeAdminFromGroup(email: string, groupId: string) {
        const group = await dal.groups.getOne(groupId);
        if (!group) throw notFound('Group does not exist');

        const groupAdmins = arrayWithout(group.admins, email);
        await dal.groups.updateOne(groupId, _ => ({ admins: groupAdmins }));

        const dalAuth = getDalAuth();
        await dalAuth.removeAdminFromGroup(email, groupId);
    }
    async function _setGroupUsersLimit(groupId: string, usersLimit: number) {
        await dal.groups.updateOne(groupId, _ => ({ usersLimit }));
    }    
    async function _setGroupBlocked(groupId: string, blocked: boolean) {
        await dal.groups.updateOne(groupId, _ => ({ blocked }));
    }
    async function _setUserRole(email: string, role: DbModel.UserRole) {
        const user = await dal.users.getOne(email);
        if (!user) throw notFound('User does not exist');

        await dal.users.updateOne(email, _ => ({ role }));
        const dalAuth = getDalAuth();
        await dalAuth.setRole(email, role);
    }
    async function _searchUsers(keyword: string) {
        return dal.users.getAll(['id', '>=', keyword], ['id', '<=', keyword + '\uf8ff']);
    }
    async function _isGroupIdFree(id: string) {
        const group = await dal.groups.getOne(id);
        return !group;
    }
    async function _updateMetadata(metadata: Partial<DbModel.Metadata>) {
        await dal.metadata.update(_ => metadata);
    }

    return {
        createGroup: _createGroup,
        deleteGroup: _deleteGroup, 
        addAdminToGroup: _addAdminToGroup,
        removeAdminFromGroup: _removeAdminFromGroup, 
        setGroupUsersLimit: _setGroupUsersLimit,
        setGroupBlocked: _setGroupBlocked,
        setUserRole: _setUserRole, 
        isGroupIdFree: _isGroupIdFree, 
        searchUsers: _searchUsers, 
        updateMetadata: _updateMetadata
    }
}