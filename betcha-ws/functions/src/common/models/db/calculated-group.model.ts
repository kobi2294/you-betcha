export interface CalculatedGroup {
    readonly id: string;    // group-id
    readonly secret: string;
    readonly users: GroupUserRecord[];
}

export interface GroupUserRecord {
    readonly id: string;
    readonly displayName: string;
    readonly photoUrl: string;
}

