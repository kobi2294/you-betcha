import { GuessValue } from "./guess-value.model";

export interface User {
    readonly id: string;
    readonly displayName: string;
    readonly photoUrl: string;
    readonly groups: string[];
    readonly guesses: Record<string, GuessValue>;
}

