import { GuessValue } from "./enums.model";
import { UserRole } from "./user-claims.model";

export interface User {
    readonly id: string;    // email
    readonly displayName: string;
    readonly photoUrl: string;
    readonly guesses: Record<string, GuessValue>;
    readonly role: UserRole;
    readonly groups: string[];  // group-ids
}

