import { GuessValue } from "./guess-value.model";
import { UserRole } from "./user-role.model";

export interface User {
    readonly id: string;
    readonly displayName: string;
    readonly photoUrl: string;
    readonly groups: string[];
    readonly role: UserRole;
    readonly guesses: Record<string, GuessValue>;
}

