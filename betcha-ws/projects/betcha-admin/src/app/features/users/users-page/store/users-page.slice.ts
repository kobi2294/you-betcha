import { LoadState } from "@lib";
import { DbModel } from "@tscommon";

export interface UsersPageSlice {
    users: DbModel.User[];

}

export type UsersPageState = UsersPageSlice & LoadState;
export const initialUsersPageSlice: UsersPageSlice = {
    users: [],
}
