import { DbModel } from "../db/db.alias";

export interface UserInfo {
    readonly id: string;
    readonly displayName: string;
    readonly photoUrl: string;
    readonly role: DbModel.UserRole;
}