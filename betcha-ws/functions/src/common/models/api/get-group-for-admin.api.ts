import { DbModel } from "../db/db.alias";
import { UserInfo } from "./user-info.model";

export interface GetGroupForAdminResponse {
    readonly groupId: string;
    readonly group: DbModel.Group;
    readonly members: UserInfo[];

}

