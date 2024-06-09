export interface Metadata {
    id: 'metadata'
    matches: Match[];
    stages: Stage[];
    countries: string[];
}

export interface Match {
    readonly id: string;
    readonly stage: string;
    readonly away: string;
    readonly home: string;
    readonly awayScore: number | null;
    readonly homeScore: number | null;
    readonly date: string;
}

export interface Stage {
    readonly id: string;
    readonly displayName: string;
    readonly points: number;
}