import { DbModel } from "@tscommon";


export function getSelectedGroup(groups: Record<string, any>, selectedGroupId: string): DbModel.Group | null {
    if (groups[selectedGroupId]) {
        return groups[selectedGroupId];
    } else {
        return null;
    }
}