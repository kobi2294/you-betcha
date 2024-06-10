import { DbModel } from "@tscommon";

export interface GroupsSlice {
    readonly groups: Record<string, DbModel.Group>;
    readonly calculatedGroups: Record<string, DbModel.CalculatedGroup>;
    readonly selectedGroupId: string;
}

export const initialGroupsSlice: GroupsSlice = {
    groups: {},
    calculatedGroups: {},
    selectedGroupId: '',
};