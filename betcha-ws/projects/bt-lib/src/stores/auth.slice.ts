import { User } from "@angular/fire/auth";
import { DbModel } from "@tscommon";

export interface AuthSlice {
    fireUser: User | null | undefined;  
    user: DbModel.User | null;
    claims: DbModel.AuthClaims | null;
}

export const initialAuthSlice: AuthSlice = {
    fireUser: undefined,
    user: null,
    claims: null
}