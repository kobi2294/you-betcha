import { GuessValue } from "./guess-value.model";
import { Match } from "./match.model";

export interface CaluculatedGroup {
    readonly id: string;    
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
