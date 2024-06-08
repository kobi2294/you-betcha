import { DbModel } from "../db/db.alias";

export interface CustomizeGroupRequest {
    readonly groupId: string;
    readonly theme?: DbModel.ColorTheme;
    readonly message?: string;
    readonly slogan?: string;    
}