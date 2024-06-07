import { LoadState } from "@lib";
import { Api, DbModel } from "@tscommon";

export interface GroupDetailsSlice {
    groupId: string;
    group: DbModel.Group | null;
    members: Api.UserInfo[];

}

export type GroupDetailsState = GroupDetailsSlice & LoadState;

export const initialGroupDetailsSlice: GroupDetailsSlice = {
    groupId: '',
    group: null,
    members: [],
}