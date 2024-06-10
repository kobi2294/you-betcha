import { DbModel } from "@tscommon";

export function fixSelectedGroup(selected: string, groups: string[]) {
    return groups.includes(selected) ? selected : groups[0];
}

export function getSelectedGroup(groups: Record<string, any>, selectedGroupId: string): DbModel.Group | null {
    if (groups[selectedGroupId]) {
        return groups[selectedGroupId];
    } else {
        return null;
    }
}