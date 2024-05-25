import { GuessValue } from "./enums.model";
import { Match } from "./metadata.model";

export interface CalculatedGroup {
    readonly id: string;    // group-id
    readonly matchScores: CalculatedMatchScores[];
}

export interface CalculatedMatchScores extends Match {
    readonly correctGuess: GuessValue | null;
    readonly points: number;
    readonly userScores: CalculatedUserScore[];
}

export interface CalculatedUserScore {
    readonly id: string;
    readonly displayName: string;
    readonly photoUrl: string;
    readonly guess: GuessValue | null;
}
