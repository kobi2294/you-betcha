import { getDal } from "../common/logic/dal/dal";
import { GuessValue } from "../common/models/db/enums.model";
import { MaybeAuthData, authorize, badRequest, notFound } from "../common/api/authorize";
import { getDalAuth } from "../common/logic/dal/dal-auth";
import { arrayWith, arrayWithout } from "../common/utils/arrays";
import { getAutomaticApi } from "./automatic.api";
import { getAuth } from "firebase-admin/auth";
import { Api } from "../common/models/api/api.alias";
import { DbModel } from "../common/public-api";
import { getOpenApi } from "./open.api";

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

    async function _createCalculatedGroups() {
        const user = await dal.users.getOne(auth.email);
        const open = getOpenApi();
        await Promise.all((user?.groups??[]).map(g => open.createCalculatedGroup(g)));
    }

    async function _setDisplayName(displayName: string) {
        await dal.users.updateOne(auth.email, _ => ({ displayName }));
        await _createCalculatedGroups();
    }

    async function _uploadProfileImage(image: number[], contentType: DbModel.ImageContentType) {
        const path = `users/${auth.email}/profile-image`;
        const url = await dal.file.upload(path, image, contentType);
        await dal.users.updateOne(auth.email, _ => ({ photoUrl: url }));
        await _createCalculatedGroups();
    }

    async function _joinGroup(groupSecret: string): Promise<DbModel.Group> {
        const group = await dal.groups.getBySecret(groupSecret);
        if (!group) throw notFound('Group does not exist');

        const user = (await dal.users.getOne(auth.email))!;
        if (!user.groups.includes(group.id)) {
            const dalAuth = getDalAuth();
        
            const userGroups = arrayWith(user?.groups, group.id);
            await dal.users.updateOne(auth.email, _ => ({ groups: userGroups }));
            await dalAuth.addUserToGroup(auth.email, group.id);
        }

        const openApi = getOpenApi();
        await openApi.createCalculatedGroup(group);

        return group;
    }

    async function _leaveGroup(groupId: string) {
        const user = (await dal.users.getOne(auth.email))!;
        const dalAuth = getDalAuth();
        
        const userGroups = arrayWithout(user?.groups, groupId);
        await dal.users.updateOne(auth.email, _ => ({ groups: userGroups }));
        await dalAuth.removeUserFromGroup(auth.email, groupId);

        const openApi = getOpenApi();
        await openApi.createCalculatedGroup(groupId);
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

    async function _getManagedGroups(): Promise<Api.GroupInfo[]> {
        let groups: DbModel.Group[] = [];

        if (auth.role === 'super') {
            groups = await dal.groups.getAll();
        } else {
            groups = await dal.groups.getAllAdminedByUser(auth.email);
        }

        return groups.map(g => ({ groupId: g.id, displayName: g.displayName }));
    }

    return {
        getUserDetails: _getUserDetails,
        setDisplayName: _setDisplayName, 
        uploadProfileImage: _uploadProfileImage,
        joinGroup: _joinGroup,
        leaveGroup: _leaveGroup,
        setGuess: _setGuess, 
        getManagedGroups: _getManagedGroups
    }
}