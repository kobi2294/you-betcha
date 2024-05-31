import { ColorTheme } from "./enums.model";

export interface Group {
    readonly id: string;
    readonly secret: string;
    readonly displayName: string;
    readonly usersLimit: number;
    readonly blocked: boolean;
    readonly logoUrl: string;
    readonly message: string;
    readonly slogan: string;
    readonly theme: ColorTheme;
    readonly admins: string[];
}