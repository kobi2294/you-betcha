import { Api, DbModel, arrayWithout } from "../common/public-api";
import { MaybeAuthData, authorize, notFound } from "../common/api/authorize";
import { getDal } from "../common/logic/dal/dal";
import { getDalAuth } from "../common/logic/dal/dal-auth";
import { getOpenApi } from "./open.api";

export function getGroupAdminApi(authData: MaybeAuthData, groupId: string) {
    authorize(authData, 'group-admin', groupId);
    const dal = getDal();

    async function _getGroupForAdmin(): Promise<Api.GetGroupForAdminResponse> {
        const group = await dal.groups.getOne(groupId);
        if (!group) throw notFound('Group not found');

        const members = await dal.users.getAllInGroup(groupId);
        return {
            groupId,
            group,
            members
        }
    }

    async function _setGroupMessage(message: string) {
        await dal.groups.updateOne(groupId, _ => ({ message }));
    }

    async function _setGroupSlogan(slogan: string) {
        await dal.groups.updateOne(groupId, _ => ({ slogan }));
    }

    async function _setGroupTheme(theme: DbModel.ColorTheme) {
        await dal.groups.updateOne(groupId, _ => ({ theme }));
    }

    async function _setGroupDisplayName(displayName: string) {
        await dal.groups.updateOne(groupId, _ => ({ displayName }));
    }

    async function _uploadLogoImage(image: number[], contentType: DbModel.ImageContentType) {
        const group = await dal.groups.getOne(groupId);
        if (!group) throw notFound('Group not found');

        const path = `groups/logo-${group.secret}`;
        const url = await dal.file.upload(path, image, contentType);
        await dal.groups.updateOne(group.id, _ => ({logoUrl: url}));
    }

    async function _removeUserFromGroup(userId: string) {
            const user = (await dal.users.getOne(userId))!;
            const dalAuth = getDalAuth();
            
            const userGroups = arrayWithout(user?.groups, groupId);
            await dal.users.updateOne(userId, _ => ({ groups: userGroups }));
            await dalAuth.removeUserFromGroup(userId, groupId);
    
            const openApi = getOpenApi();
            await openApi.createCalculatedGroup(groupId);
        }    


    return {
        setGroupMessage: _setGroupMessage, 
        setGroupSlogan: _setGroupSlogan, 
        setGroupTheme: _setGroupTheme, 
        setGroupDisplayName: _setGroupDisplayName, 
        getGroupForAdmin: _getGroupForAdmin, 
        uploadLogoImage: _uploadLogoImage, 
        removeUserFromGroup: _removeUserFromGroup
    }
}