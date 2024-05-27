import { AuthToken, authorize } from "../common/api/authorize";
import { DbModel } from "../common/models/db/db.alias";
import { getDal } from "../common/logic/dal/dal";

export function getAdminApi(token: AuthToken) {
    authorize(token, 'admin');
    const dal = getDal();

    async function _setMatches(matches: DbModel.Match[]) {
        await dal.metadata.set({ matches });
    }


    return {
        setMatches: _setMatches
    }


}