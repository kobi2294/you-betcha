export function fixSelectedGroup(selected: string, groups: string[]) {
    return groups.includes(selected) ? selected : groups[0];
}