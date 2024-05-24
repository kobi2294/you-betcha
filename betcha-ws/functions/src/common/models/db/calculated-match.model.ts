import { GuessValue } from "./guess-value.model";
import { Match } from "./match.model";

export interface CalculatedMatch extends Match {   
    readonly correctGuess: GuessValue | null; 
    readonly points: number;
    readonly statistics: Record<GuessValue, number>;
}