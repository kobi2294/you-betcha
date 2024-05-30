import { User } from "@angular/fire/auth";

export interface AuthSlice {
    user: User | null | undefined;   
}

export const initialAuthSlice: AuthSlice = {
    user: undefined
}