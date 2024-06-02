import { DbModel } from "src/common/public-api";
import { MaybeAuthData, authorize, unauthenticated } from "../common/api/authorize";
import { getDal } from "../common/logic/dal/dal";
import { getDalAuth } from "../common/logic/dal/dal-auth";
import { UserRecord } from "firebase-admin/auth";

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

    async function _onNewUserCreated(userRecord: UserRecord) {
        const email = userRecord.email || userRecord.providerData[0]?.email;
        if (!email) throw unauthenticated('User does not have an email');

        const displayName = userRecord.displayName 
            || userRecord.providerData[0]?.displayName
            || email.substring(0, email.indexOf('@'));

        const isHardCodedSuper = 
            (email === 'kobihari@gmail.com' || email === 'adva30@gmail.com') &&
            userRecord.providerData.some(pd => pd.providerId === 'google.com');

        console.log('user record', userRecord);


        const user: DbModel.User = {
            id: email,
            displayName: displayName, 
            groups: [], 
            photoUrl: userRecord.photoURL || '', 
            guesses: {}, 
            role: isHardCodedSuper ? 'super' : 'user'
        };

        await dal.users.saveOne(user);
        await _collectUserGroupAdmins(user.id);
        if (isHardCodedSuper) {
            const dalAuth = getDalAuth();
            await dalAuth.setRole(user.id, 'super');
        }
    }

    return {
        collectUserGroupAdmins: _collectUserGroupAdmins, 
        onNewUserCreated: _onNewUserCreated
    }
}