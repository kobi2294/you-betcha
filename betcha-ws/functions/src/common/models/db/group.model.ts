import { ColorTheme } from "./color-theme.model";

export interface Group {
    readonly id: string;
    readonly secret: string;
    readonly displayName: string;
    readonly usersLimit: number;
    readonly blocked: boolean;
    readonly photoUrl: string;
    readonly latestMessage: string;
    readonly latestMessagePhotoUrl: string;
    readonly theme: ColorTheme;
}