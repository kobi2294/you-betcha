import { getDal } from "../common/logic/dal/dal";
import { GuessValue } from "../common/models/db/enums.model";
import { MaybeAuthData, authorize, badRequest, notFound } from "../common/api/authorize";
import { getDalAuth } from "../common/logic/dal/dal-auth";
import { DalFileContentType } from "../common/logic/dal/dal-types";
import { arrayWith, arrayWithout } from "../common/utils/arrays";
import { getAutomaticApi } from "./automatic.api";
import { getAuth } from "firebase-admin/auth";

export function getUserApi(authData: MaybeAuthData) {
    const auth = authorize(authData, 'user');
    const dal = getDal();    

    async function _getUserDetails() {
        let user = await dal.users.getOne(auth.email);
        if (!user) {
            const superToken = authorize.upgrateToSuper(authData);
            const auto = getAutomaticApi(superToken);
            const authService = getAuth();
            const record = await authService.getUserByEmail(auth.email);
            await auto.onNewUserCreated(record);
            user = await dal.users.getOne(auth.email);
        }
        if (!user) throw notFound('User does not exist');
        return user;
    }

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
        if (!group) throw notFound('Group does not exist');

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

        if (!user) throw notFound('User does not exist');
        if (!metadata) throw notFound('Metadata does not exist');

        const match = metadata.matches.find(m => m.id === matchId);
        if (!match) throw notFound('Match does not exist');

        if (Date.now() > new Date(match.date).valueOf()) 
            throw badRequest('Match has already started');

        const userGuesses = { ...user.guesses, [matchId]: guess };
        await dal.users.updateOne(auth.email, _ => ({ guesses: userGuesses }));
    }

    return {
        getUserDetails: _getUserDetails,
        setDisplayName: _setDisplayName, 
        uploadProfileImage: _uploadProfileImage,
        joinGroup: _joinGroup,
        leaveGroup: _leaveGroup,
        setGuess: _setGuess
    }
}