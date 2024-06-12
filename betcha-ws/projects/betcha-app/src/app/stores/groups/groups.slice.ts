import { DbModel } from "@tscommon";

export interface GroupsSlice {
    readonly groups: Record<string, DbModel.Group>;
    readonly selectedGroupId: string;
}

export const initialGroupsSlice: GroupsSlice = {
    groups: {},
    selectedGroupId: '',
};