import { GuessValue, UserRole } from "./enums.model";

export interface User {
    readonly id: string;    // email
    readonly displayName: string;
    readonly photoUrl: string;
    readonly groups: string[];
    readonly role: UserRole;
    readonly guesses: Record<string, GuessValue>;
}

