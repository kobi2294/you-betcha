import { LoadState } from "@lib";
import { DbModel } from "@tscommon";

export interface GroupsPageSlice {
    readonly groups: DbModel.Group[];
}

export type GroupsPageState = GroupsPageSlice & LoadState;

export const initialGroupsPageSlice: GroupsPageSlice = {
    groups: [],
}

