import { GuessValue } from "./enums.model";

export interface CalculatedGroupMatchScore {
    readonly id: string;    // match-id
    readonly matchId: string;
    readonly groupId: string;
    readonly points: number;
    readonly stage: string;
    readonly away: string;
    readonly home: string;
    readonly date: string;
    readonly userScores: CalculatedUserScore[];
}

export interface CalculatedUserScore {
    readonly id: string;
    readonly guess: GuessValue | null;
}
