import { getDal } from "../common/logic/dal/dal";
import { GuessValue } from "../common/models/db/enums.model";
import { AuthToken, authorize } from "../common/api/authorize";
import { getDalAuth } from "../common/logic/dal/dal-auth";
import { DalFileContentType } from "../common/logic/dal/dal-types";
import { arrayWith, arrayWithout } from "../common/utils/arrays";

export function getUserApi(authData: AuthToken) {
    const auth = authorize(authData, 'user');
    const dal = getDal();
    

    async function _setDisplayName(displayName: string) {
        await dal.users.updateOne(auth.email, _ => ({ displayName }));
    }

    async function _uploadProfileImage(image: string, contentType: DalFileContentType) {
        const path = `users/${auth.email}/profile-image`;
        await dal.file.upload(path, image, contentType);
        await dal.users.updateOne(auth.email, _ => ({ photoUrl: path }));
    }

    async function _joinGroup(groupSecret: string) {
        const group = await dal.groups.getBySecret(groupSecret);
        if (!group) throw new Error('Group does not exist');

        const user = (await dal.users.getOne(auth.email))!;
        const dalAuth = getDalAuth();
        
        const userGroups = arrayWith(user?.groups, group.id);
        await dal.users.updateOne(auth.email, _ => ({ groups: userGroups }));
        await dalAuth.addUserToGroup(auth.email, group.id);
    }

    async function _leaveGroup(groupId: string) {
        const user = (await dal.users.getOne(auth.email))!;
        const dalAuth = getDalAuth();
        
        const userGroups = arrayWithout(user?.groups, groupId);
        await dal.users.updateOne(auth.email, _ => ({ groups: userGroups }));
        await dalAuth.removeUserFromGroup(auth.email, groupId);

    }

    async function _setGuess(matchId: string, guess: GuessValue) {
        const [user, metadata] = await Promise.all([
            dal.users.getOne(auth.email),
            dal.metadata.get()
        ]);

        if (!user) throw new Error('User does not exist');
        if (!metadata) throw new Error('Metadata does not exist');

        const match = metadata.matches.find(m => m.id === matchId);
        if (!match) throw new Error('Match does not exist');

        if (Date.now() > new Date(match.date).valueOf()) 
            throw new Error('Match has already started');

        const userGuesses = { ...user.guesses, [matchId]: guess };
        await dal.users.updateOne(auth.email, _ => ({ guesses: userGuesses }));
    }

    return {
        setDisplayName: _setDisplayName, 
        uploadProfileImage: _uploadProfileImage,
        joinGroup: _joinGroup,
        leaveGroup: _leaveGroup,
        setGuess: _setGuess
    }
}