export interface Match {
    readonly id: string;
    readonly stage: string;
    readonly away: string;
    readonly home: string;
    readonly awayScore: number | null;
    readonly homeScore: number | null;
    readonly date: string;
}