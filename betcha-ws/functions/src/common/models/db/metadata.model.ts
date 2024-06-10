export interface Metadata {
    id: 'metadata'
    matches: Match[];
    stages: Stage[];
    countries: string[];
}

export const defaultMetadata: Metadata = {
    id: 'metadata',
    matches: [],
    stages: [],
    countries: []

}

export interface Match {
    readonly id: string;
    readonly stage: string;
    readonly away: string | null;
    readonly home: string | null;
    readonly awayScore: number | null;
    readonly homeScore: number | null;
    readonly date: string;
}

export interface Stage {
    readonly id: string;
    readonly displayName: string;
    readonly points: number;
}