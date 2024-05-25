import { UserRole } from "./enums.model";

export interface UserAuth {
    readonly id: string;
    readonly email: string;
    readonly role: UserRole;
    readonly groups: string[];

}

export interface AuthClaims {
    readonly role: UserRole;
    readonly groups: string[];
}