import { GuessValue } from "./enums.model";
import { Match } from "./metadata.model";

export interface CalculatedMatch extends Match {   
    readonly correctGuess: GuessValue | null; 
    readonly points: number;
    readonly statistics: Record<GuessValue, number>;
}