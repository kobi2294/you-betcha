import { MaybeAuthData, authorize } from "../common/api/authorize";
import { getDal } from "../common/logic/dal/dal";
import { DbModel } from "../common/models/db/db.alias";

export function getGroupAdminApi(authData: MaybeAuthData, groupId: string) {
    authorize(authData, 'group-admin', groupId);
    const dal = getDal();

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

    return {
        setGroupMessage: _setGroupMessage, 
        setGroupSlogan: _setGroupSlogan, 
        setGroupTheme: _setGroupTheme, 
        setGroupDisplayName: _setGroupDisplayName
    }
}