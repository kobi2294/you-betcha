import { DbModel } from "../common/models/db/db.alias";
import { getDal } from "../common/logic/dal/dal";
import { MaybeAuthData, authorize } from "../common/api/authorize";

export function getTrusteeApi(data: MaybeAuthData) {
    authorize(data, 'trustee');
    const dal = getDal();

    async function _setMatches(matches: DbModel.Match[]) {
        await dal.metadata.set({ matches });
    }


    return {
        setMatches: _setMatches
    }


}