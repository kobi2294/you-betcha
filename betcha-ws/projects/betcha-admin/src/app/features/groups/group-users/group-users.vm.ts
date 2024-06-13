import { Api, DbModel } from "@tscommon";

export interface UsersVm {
    readonly records: UserRecord[];
}

export interface UserRecord {
    readonly user: Api.UserInfo;
    readonly isAdmin: boolean;
}

export function buildUsersVm(users: Api.UserInfo[], groupAdmins: string[]): UsersVm {
    const set = new Set(groupAdmins);

    return {
        records: users.map(user => ({
            user,
            isAdmin: set.has(user.id)
        }))
    };
}