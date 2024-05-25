import { AuthData } from "firebase-functions/lib/common/providers/tasks";
import { authorize } from "../common/api/authorize";
import { DbModel } from "../common/models/db/db.alias";
import { getDal } from "../common/logic/dal/dal";

export function getAdminApi(authData: AuthData | undefined) {
    const auth = authorize(authData, 'admin');
    const dal = getDal();

    async function _setMatches(matches: DbModel.Match[]) {
        await dal.metadata.set({ matches });
    }


    return {
        setMatches: _setMatches
    }


}