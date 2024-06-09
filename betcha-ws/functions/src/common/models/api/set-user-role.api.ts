import { DbModel } from "../db/db.alias";

export interface SetUserRoleRequest {
    email: string;
    role: DbModel.UserRole;
}